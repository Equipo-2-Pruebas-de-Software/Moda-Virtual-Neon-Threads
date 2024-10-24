const Product = require('../models/products');

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { name, description, price, discount, originalPrice, availableSizes, category, image } = req.body;
        console.log('Creando un nuevo producto:', { name, category, price }); // Log de creación

        const newProduct = new Product({
            name,
            description,
            price,
            discount,
            originalPrice,
            availableSizes,
            category,
            image // Aquí se incluye la imagen en base64
        });

        const savedProduct = await newProduct.save();
        console.log('Producto creado con éxito:', savedProduct); // Log de éxito
        res.status(201).json(savedProduct); // Devolver el producto creado, incluyendo el _id
    } catch (error) {
        console.error('Error al crear el producto:', error); // Log de error
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log(`Se obtuvieron ${products.length} productos`); // Log de productos obtenidos
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error); // Log de error
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        console.log(`Buscando producto con ID: ${req.params.id}`); // Log de búsqueda
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.warn(`Producto no encontrado con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error); // Log de error
        res.status(500).json({ message: 'Error al obtener el producto', error });
    }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        console.log(`Actualizando producto con ID: ${req.params.id}`); // Log de actualización
        const { name, description, price, discount, originalPrice, availableSizes, category, image } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, discount, originalPrice, availableSizes, category, image },
            { new: true } // Para devolver el producto actualizado
        );
        if (!updatedProduct) {
            console.warn(`Producto no encontrado para actualizar con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        console.log('Producto actualizado con éxito:', updatedProduct); // Log de éxito
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error); // Log de error
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        console.log(`Eliminando producto con ID: ${req.params.id}`); // Log de eliminación
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            console.warn(`Producto no encontrado para eliminar con ID: ${req.params.id}`); // Log de advertencia
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        console.log('Producto eliminado correctamente:', deletedProduct); // Log de éxito
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error); // Log de error
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Filtrar productos por nombre o descripción
const filterProducts = async (req, res) => {
    try {
        const { search } = req.query;
        console.log(`Filtrando productos con búsqueda: "${search}"`); // Log de filtrado

        if (!search) return res.status(400).json({ message: 'Por favor, proporciona un término de búsqueda' });

        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        });

        if (products.length === 0) {
            console.warn('No se encontraron productos que coincidan con la búsqueda'); // Log de advertencia
            return res.status(404).json({ message: 'No se encontraron productos que coincidan con la búsqueda' });
        }

        console.log(`Se encontraron ${products.length} productos que coinciden con la búsqueda`); // Log de éxito
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al filtrar los productos:', error); // Log de error
        res.status(500).json({ message: 'Error al filtrar los productos', error });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    filterProducts,
    updateProduct,
    deleteProduct
};
