-- CreateEnum
CREATE TYPE "TipoProducto" AS ENUM ('ZAPATILLA', 'ROPA');

-- CreateEnum
CREATE TYPE "Seccion" AS ENUM ('MASCULINO', 'FEMENINO', 'NINOS', 'DESTACADOS', 'ACCESORIOS');

-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Talle" (
    "id" SERIAL NOT NULL,
    "talle" TEXT NOT NULL,

    CONSTRAINT "Talle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Descuento" (
    "id" SERIAL NOT NULL,
    "fechaInicio" TEXT NOT NULL,
    "fechaFin" TEXT NOT NULL,
    "precioId" INTEGER,
    "ordenCompraId" INTEGER,

    CONSTRAINT "Descuento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Precio" (
    "id" SERIAL NOT NULL,
    "precioCompra" INTEGER NOT NULL,
    "precioVenta" INTEGER NOT NULL,

    CONSTRAINT "Precio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenProducto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "ImagenProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetalleProducto" (
    "id" SERIAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "estado" BOOLEAN DEFAULT true,
    "productoId" INTEGER,
    "precioId" INTEGER,
    "imagenProductoId" INTEGER,

    CONSTRAINT "DetalleProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoriaId" INTEGER,
    "seccion" "Seccion",
    "tipoProducto" "TipoProducto" NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT,
    "contraseña" TEXT NOT NULL,
    "dni" TEXT,
    "rol" "Rol" DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioDireccion" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "UsuarioDireccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Direccion" (
    "id" SERIAL NOT NULL,
    "localidad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "usuarioDireccionId" INTEGER,

    CONSTRAINT "Direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdenCompra" (
    "id" SERIAL NOT NULL,
    "usuarioDireccionId" INTEGER,
    "total" INTEGER NOT NULL,
    "fechaCompra" TEXT NOT NULL,

    CONSTRAINT "OrdenCompra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdenCompraDetalle" (
    "id" SERIAL NOT NULL,
    "ordenCompraId" INTEGER,
    "productoId" INTEGER,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "OrdenCompraDetalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DetalleProductoToTalle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DetalleProductoToTalle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Descuento_precioId_key" ON "Descuento"("precioId");

-- CreateIndex
CREATE UNIQUE INDEX "Descuento_ordenCompraId_key" ON "Descuento"("ordenCompraId");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleProducto_productoId_key" ON "DetalleProducto"("productoId");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleProducto_precioId_key" ON "DetalleProducto"("precioId");

-- CreateIndex
CREATE UNIQUE INDEX "DetalleProducto_imagenProductoId_key" ON "DetalleProducto"("imagenProductoId");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_categoriaId_key" ON "Producto"("categoriaId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioDireccion_userId_key" ON "UsuarioDireccion"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Direccion_usuarioDireccionId_key" ON "Direccion"("usuarioDireccionId");

-- CreateIndex
CREATE UNIQUE INDEX "OrdenCompra_usuarioDireccionId_key" ON "OrdenCompra"("usuarioDireccionId");

-- CreateIndex
CREATE UNIQUE INDEX "OrdenCompraDetalle_ordenCompraId_key" ON "OrdenCompraDetalle"("ordenCompraId");

-- CreateIndex
CREATE UNIQUE INDEX "OrdenCompraDetalle_productoId_key" ON "OrdenCompraDetalle"("productoId");

-- CreateIndex
CREATE INDEX "_DetalleProductoToTalle_B_index" ON "_DetalleProductoToTalle"("B");

-- AddForeignKey
ALTER TABLE "Descuento" ADD CONSTRAINT "Descuento_precioId_fkey" FOREIGN KEY ("precioId") REFERENCES "Precio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Descuento" ADD CONSTRAINT "Descuento_ordenCompraId_fkey" FOREIGN KEY ("ordenCompraId") REFERENCES "OrdenCompra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProducto" ADD CONSTRAINT "DetalleProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProducto" ADD CONSTRAINT "DetalleProducto_precioId_fkey" FOREIGN KEY ("precioId") REFERENCES "Precio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetalleProducto" ADD CONSTRAINT "DetalleProducto_imagenProductoId_fkey" FOREIGN KEY ("imagenProductoId") REFERENCES "ImagenProducto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioDireccion" ADD CONSTRAINT "UsuarioDireccion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Direccion" ADD CONSTRAINT "Direccion_usuarioDireccionId_fkey" FOREIGN KEY ("usuarioDireccionId") REFERENCES "UsuarioDireccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenCompra" ADD CONSTRAINT "OrdenCompra_usuarioDireccionId_fkey" FOREIGN KEY ("usuarioDireccionId") REFERENCES "UsuarioDireccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenCompraDetalle" ADD CONSTRAINT "OrdenCompraDetalle_ordenCompraId_fkey" FOREIGN KEY ("ordenCompraId") REFERENCES "OrdenCompra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrdenCompraDetalle" ADD CONSTRAINT "OrdenCompraDetalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DetalleProductoToTalle" ADD CONSTRAINT "_DetalleProductoToTalle_A_fkey" FOREIGN KEY ("A") REFERENCES "DetalleProducto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DetalleProductoToTalle" ADD CONSTRAINT "_DetalleProductoToTalle_B_fkey" FOREIGN KEY ("B") REFERENCES "Talle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
