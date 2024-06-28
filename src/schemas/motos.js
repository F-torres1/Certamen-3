import { setLocale, ValidationError, ref, object, string } from "yup";
import {es } from "yup-locales";
import { object, string, number } from "yup";

setLocale(es);

export const motoSchema = object ({
    marca: string().required(),
    model: string().required(),
    ano: number().required(),
    motor: string().required(),
    tipo: string().required(),
    precio: number().required(),
    caracteristicas: string().required()
})
