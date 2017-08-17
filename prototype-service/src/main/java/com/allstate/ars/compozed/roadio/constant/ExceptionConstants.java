package com.allstate.ars.compozed.roadio.constant;

public final class ExceptionConstants {

    // Global Exceptions
    public static final String NOT_EMPTY_MESSAGE = " must not be empty.";

    /*
    * Exception type detail messages
    */

    // Bad Request 400
    public static final String BAD_REQUEST_DETAIL_MESSAGE = "Client error with malformed input parameters.";

    // Not Found 404
    public static final String NOT_FOUND_DETAIL_MESSAGE = "Resource not found with bad endpoint.";

    // Method Not Allowed 405
    public static final String METHOD_NOT_ALLOWED_DETAIL_MESSAGE = "Incorrect type of HTTP request.";

    // Method Not Allowed 409
    public static final String DUPLICATE_REQUEST_DETAIL_MESSAGE = "Action would create duplicate record.";

    // Requested Variable Gone 410
    public static final String GONE_REQUEST_DETAIL_MESSAGE = "Unknown resource.";

    // Gateway Timeout 504
    public static final String GATEWAY_TIMEOUT_DETAIL_MESSAGE = "Server-side error, database timed out.";

    // Internal Server ErrorMessage 500
    public static final String INTERNAL_SERVER_ERROR_DETAIL_MESSAGE = "Internal Server-side error.";

    private ExceptionConstants() {

    }
}
