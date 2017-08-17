package com.allstate.ars.compozed.util;

import com.allstate.ars.compozed.aspect.Loggable;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class JsonConverterUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonConverterUtil.class);

    private JsonConverterUtil() {
        throw new IllegalAccessError("Utility class");
    }

    @Loggable
    public static <T> String objectToString(T t) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = "";
        try
        {
            jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(t);
        }
        catch (JsonProcessingException e) {
            LOGGER.error("Json parsing failed: {}",String.valueOf(e));
        }
        return jsonString;
    }
}