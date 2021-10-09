import {schema, model, Schema} from "mongoose";

const SicaSchema = new Schema(
    {
        campo1: {
            type: String,
            required: true,
        },
        campo2: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)