const z = require('zod');

const familiaSchema = z.object({
    id: z.number(),
    nombre: z.string()
});

const productoSchema = z.object({

    nombre: z.string({
        invalid_type_error: 'El nombre del producto debe ser un string',
        required_error: ' El nombre del producto es requerido'
    }),

    fechaAlta: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Fecha debe ser una fecha valida"
    }),

    descatalogado: z.boolean(),
    precio: z.number().positive(),

    descripcion: z.string({
        message: "La descripción debe ser un string"
    }),

    familia: familiaSchema

});

// opción strict() -> No funciona para una validación parcial
// opción refine() -> Para no permitir una propiedad. Se tendrían que crear dos esquemas

/*
const productoSinIdSchema = productoSchema.omit({ id: true });
function validatePartialProducto(input){
    return productoSinIdSchema.partial().safeParse(input);

    // OJO! El problema de esto es que lanza una excepción con un mensaje que hay que tratar. 
    // Esto implica más trabajo (y a nadie le gusta trabajar)
}
*/

function validateProducto(input){
    return productoSchema.safeParse(input)
}

function validatePartialProducto(input){
    return productoSchema.partial().safeParse(input);
}

module.exports = {
    validateProducto, validatePartialProducto
}
