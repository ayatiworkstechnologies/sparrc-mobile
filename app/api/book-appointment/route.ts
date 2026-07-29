import {
  NextRequest,
  NextResponse,
} from "next/server";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

/* ------------------------------------------------------------------ */
/* API configuration                                                  */
/* ------------------------------------------------------------------ */

const APPOINTMENT_API_URL =
  "https://api.ayatiworks.com/api/v1/public/sparrc/book_appointment/records";

const APPOINTMENT_API_KEY =
  "8d4fa4263bf728f7954a18bee92f535b48e4b20d10bf9039bdcf589bf05b33c5";

const ALLOWED_THERAPIES =
  new Set([
    "MTPT",
    "Prescription Exercise",
    "PEMF",
    "Sports Massage",
    "Physiotherapy",
    "Aquatherapy",
    "Group Therapy",
    "Kalaripayattu",
    "Yoga Therapy",
    "Alternate Therapy",
    "Functional Training",
    "Cranio Sacral Therapy",
    "Six Healing Sounds",
  ]);

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface AppointmentRequestBody {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  therapy?: unknown;
  message?: unknown;
}

interface UpstreamErrorResponse {
  message?: unknown;
  detail?: unknown;
  error?: unknown;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function normalizeString(
  value: unknown
): string {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function isValidEmail(
  value: string
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

function isValidPhone(
  value: string
): boolean {
  const digits =
    value.replace(
      /\D/g,
      ""
    );

  return (
    digits.length >= 7 &&
    digits.length <= 15
  );
}

function getUpstreamErrorMessage(
  payload: unknown,
  fallbackMessage: string
): string {
  if (
    !payload ||
    typeof payload !==
      "object"
  ) {
    return fallbackMessage;
  }

  const response =
    payload as UpstreamErrorResponse;

  if (
    typeof response.message ===
      "string" &&
    response.message.trim()
  ) {
    return response.message.trim();
  }

  if (
    typeof response.detail ===
      "string" &&
    response.detail.trim()
  ) {
    return response.detail.trim();
  }

  if (
    typeof response.error ===
      "string" &&
    response.error.trim()
  ) {
    return response.error.trim();
  }

  return fallbackMessage;
}

async function parseUpstreamResponse(
  response: Response
): Promise<unknown> {
  const responseText =
    await response.text();

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(
      responseText
    ) as unknown;
  } catch {
    return {
      message:
        responseText,
    };
  }
}

/* ------------------------------------------------------------------ */
/* POST                                                               */
/* ------------------------------------------------------------------ */

export async function POST(
  request: NextRequest
) {
  let requestBody: AppointmentRequestBody;

  try {
    requestBody =
      (await request.json()) as AppointmentRequestBody;
  } catch {
    return NextResponse.json(
      {
        success: false,

        message:
          "Invalid request body.",
      },
      {
        status: 400,
      }
    );
  }

  const name =
    normalizeString(
      requestBody.name
    );

  const phone =
    normalizeString(
      requestBody.phone
    );

  const email =
    normalizeString(
      requestBody.email
    );

  const therapy =
    normalizeString(
      requestBody.therapy
    );

  const message =
    normalizeString(
      requestBody.message
    );

  /* ---------------------------------------------------------------- */
  /* Validation                                                       */
  /* ---------------------------------------------------------------- */

  if (
    !name ||
    !phone ||
    !email ||
    !therapy ||
    !message
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Name, phone, email, therapy, and message are required.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    name.length > 120
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Name must be 120 characters or fewer.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !ALLOWED_THERAPIES.has(
      therapy
    )
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Please select a valid therapy page.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !isValidPhone(phone)
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Please enter a valid phone number.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    !isValidEmail(email)
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Please enter a valid email address.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    email.length > 254
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Email address is too long.",
      },
      {
        status: 400,
      }
    );
  }

  if (
    message.length > 3000
  ) {
    return NextResponse.json(
      {
        success: false,

        message:
          "Message must be 3000 characters or fewer.",
      },
      {
        status: 400,
      }
    );
  }

  /* ---------------------------------------------------------------- */
  /* Request timeout                                                  */
  /* ---------------------------------------------------------------- */

  const controller =
    new AbortController();

  const timeoutId =
    setTimeout(() => {
      controller.abort();
    }, 15000);

  try {
    const upstreamResponse =
      await fetch(
        APPOINTMENT_API_URL,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            "X-API-Key":
              APPOINTMENT_API_KEY,
          },

          body: JSON.stringify({
            data: {
              name,
              phone,
              email,
              therapy,
              message,
            },
          }),

          cache: "no-store",

          signal:
            controller.signal,
        }
      );

    const upstreamData =
      await parseUpstreamResponse(
        upstreamResponse
      );

    if (
      !upstreamResponse.ok
    ) {
      console.error(
        "Appointment API error:",
        {
          status:
            upstreamResponse.status,

          statusText:
            upstreamResponse.statusText,

          data:
            upstreamData,
        }
      );

      const responseStatus =
        upstreamResponse.status >=
        500
          ? 502
          : upstreamResponse.status;

      return NextResponse.json(
        {
          success: false,

          message:
            getUpstreamErrorMessage(
              upstreamData,

              "Unable to submit your appointment. Please try again."
            ),
        },
        {
          status:
            responseStatus,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,

        message:
          "Your appointment has been submitted successfully.",

        data:
          upstreamData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.name ===
        "AbortError"
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "The service took too long to respond. Please try again.",
        },
        {
          status: 504,
        }
      );
    }

    console.error(
      "Book appointment route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to connect to the service. Please try again.",
      },
      {
        status: 500,
      }
    );
  } finally {
    clearTimeout(
      timeoutId
    );
  }
}

/* ------------------------------------------------------------------ */
/* Reject GET                                                         */
/* ------------------------------------------------------------------ */

export async function GET() {
  return NextResponse.json(
    {
      success: false,

      message:
        "Method not allowed. Use POST to submit an appointment.",
    },
    {
      status: 405,

      headers: {
        Allow: "POST",
      },
    }
  );
}