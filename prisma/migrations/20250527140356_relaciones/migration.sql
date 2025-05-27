/*
  Warnings:

  - A unique constraint covering the columns `[usuarioDireccionId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TipoProducto" AS ENUM ('ZAPATILLA', 'ROPA');

-- CreateEnum
CREATE TYPE "Seccion" AS ENUM ('MASCULINO', 'FEMENINO', 'NIÑOS', 'DESTACADOS', 'ACCESORIOS');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "usuarioDireccionId" INTEGER;

-- CreateTable
CREATE TABLE "categoria" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talle" (
    "id" SERIAL NOT NULL,
    "talle" TEXT NOT NULL,

    CONSTRAINT "talle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "descuento" (
    "id" SERIAL NOT NULL,
    "fechaInicio" TEXT NOT NULL,
    "fechaFin" TEXT NOT NULL,

    CONSTRAINT "descuento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "precio" (
    "id" SERIAL NOT NULL,
    "precioCompra" INTEGER NOT NULL,
    "precioVenta" INTEGER NOT NULL,
    "descuentoId" INTEGER,

    CONSTRAINT "precio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagenProducto" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,

    CONSTRAINT "imagenProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalleProducto" (
    "id" SERIAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "estado" BOOLEAN DEFAULT true,
    "productoId" INTEGER,
    "precioId" INTEGER,
    "imagenProductoId" INTEGER,

    CONSTRAINT "detalleProducto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoriaId" INTEGER,
    "seccion" "Seccion",
    "tipoProducto" "TipoProducto" NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarioDireccion" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "usuarioDireccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direccion" (
    "id" SERIAL NOT NULL,
    "localidad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "usuarioDireccionId" INTEGER,

    CONSTRAINT "direccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenCompra" (
    "id" SERIAL NOT NULL,
    "usuarioDireccionId" INTEGER,
    "total" INTEGER NOT NULL,
    "descuentoId" INTEGER,
    "fechaCompra" TEXT NOT NULL,

    CONSTRAINT "ordenCompra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenCompraDetalle" (
    "id" SERIAL NOT NULL,
    "ordenCompraId" INTEGER,
    "productoId" INTEGER,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "ordenCompraDetalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_detalleProductoTotalle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_detalleProductoTotalle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "precio_descuentoId_key" ON "precio"("descuentoId");

-- CreateIndex
CREATE UNIQUE INDEX "detalleProducto_productoId_key" ON "detalleProducto"("productoId");

-- CreateIndex
CREATE UNIQUE INDEX "detalleProducto_precioId_key" ON "detalleProducto"("precioId");

-- CreateIndex
CREATE UNIQUE INDEX "detalleProducto_imagenProductoId_key" ON "detalleProducto"("imagenProductoId");

-- CreateIndex
CREATE UNIQUE INDEX "producto_categoriaId_key" ON "producto"("categoriaId");

-- CreateIndex
CREATE UNIQUE INDEX "direccion_usuarioDireccionId_key" ON "direccion"("usuarioDireccionId");

-- CreateIndex
CREATE UNIQUE INDEX "ordenCompra_usuarioDireccionId_key" ON "ordenCompra"("usuarioDireccionId");

-- CreateIndex
CREATE UNIQUE INDEX "ordenCompra_descuentoId_key" ON "ordenCompra"("descuentoId");

-- CreateIndex
CREATE UNIQUE INDEX "ordenCompraDetalle_ordenCompraId_key" ON "ordenCompraDetalle"("ordenCompraId");

-- CreateIndex
CREATE UNIQUE INDEX "ordenCompraDetalle_productoId_key" ON "ordenCompraDetalle"("productoId");

-- CreateIndex
CREATE INDEX "_detalleProductoTotalle_B_index" ON "_detalleProductoTotalle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "user_usuarioDireccionId_key" ON "user"("usuarioDireccionId");

-- AddForeignKey
ALTER TABLE "precio" ADD CONSTRAINT "precio_descuentoId_fkey" FOREIGN KEY ("descuentoId") REFERENCES "descuento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleProducto" ADD CONSTRAINT "detalleProducto_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleProducto" ADD CONSTRAINT "detalleProducto_precioId_fkey" FOREIGN KEY ("precioId") REFERENCES "precio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalleProducto" ADD CONSTRAINT "detalleProducto_imagenProductoId_fkey" FOREIGN KEY ("imagenProductoId") REFERENCES "imagenProducto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_usuarioDireccionId_fkey" FOREIGN KEY ("usuarioDireccionId") REFERENCES "usuarioDireccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direccion" ADD CONSTRAINT "direccion_usuarioDireccionId_fkey" FOREIGN KEY ("usuarioDireccionId") REFERENCES "usuarioDireccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenCompra" ADD CONSTRAINT "ordenCompra_usuarioDireccionId_fkey" FOREIGN KEY ("usuarioDireccionId") REFERENCES "usuarioDireccion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenCompra" ADD CONSTRAINT "ordenCompra_descuentoId_fkey" FOREIGN KEY ("descuentoId") REFERENCES "descuento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenCompraDetalle" ADD CONSTRAINT "ordenCompraDetalle_ordenCompraId_fkey" FOREIGN KEY ("ordenCompraId") REFERENCES "ordenCompra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenCompraDetalle" ADD CONSTRAINT "ordenCompraDetalle_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_detalleProductoTotalle" ADD CONSTRAINT "_detalleProductoTotalle_A_fkey" FOREIGN KEY ("A") REFERENCES "detalleProducto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_detalleProductoTotalle" ADD CONSTRAINT "_detalleProductoTotalle_B_fkey" FOREIGN KEY ("B") REFERENCES "talle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
