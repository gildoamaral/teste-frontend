import ExcelJS from "exceljs";
import type { Product } from "../types/Product";

function processImageField(url: string | null | undefined): string {
  if (!url) return "";

  const safeUrl = String(url).trim();

  if (safeUrl.startsWith("data:image")) {
    return "[Imagem Local - Upload]";
  }

  return safeUrl;
}

/**
 * Importa produtos de um arquivo Excel
 */
export async function importProductsFromExcel(file: File): Promise<Product[]> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error("Nenhuma planilha encontrada no arquivo");
  }

  const headers: string[] = [];
  const importedProducts: Product[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell((cell) => {
        headers.push(String(cell.value).toLowerCase().trim());
      });
    } else {
      const rowData: Record<string, any> = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1] || `col${colNumber}`;
        rowData[header] = cell.value;
      });

      const product = parseProductFromRow(rowData, rowNumber - 1);

      if (product.name) {
        importedProducts.push(product);
      }
    }
  });

  return importedProducts;
}

/**
 * Exporta produtos para um arquivo Excel
 */
export async function exportProductsToExcel(
  products: Product[],
): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Produtos");

  worksheet.columns = [
    { header: "ID", key: "id", width: 15 },
    { header: "EAN", key: "ean", width: 15 },
    { header: "Name", key: "name", width: 30 },
    { header: "Status", key: "status", width: 15 },
    { header: "Score", key: "score", width: 12 },
    { header: "Mirakl_Image", key: "miraklImage", width: 60 },
    { header: "BB_Image_Url", key: "bbImageUrl", width: 60 },
  ];

  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4F46E5" },
  };

  products.forEach((product) => {
    worksheet.addRow({
      ...product,
      miraklImage: processImageField(product.miraklImage),
      bbImageUrl: processImageField(product.bbImageUrl),
      score: product.score !== null ? product.score : "N/A",
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `produtos_${new Date().toISOString().split("T")[0]}.xlsx`;
  link.click();

  URL.revokeObjectURL(url);
}

/**
 * Faz o parse de uma linha do Excel para um objeto Product
 */
function parseProductFromRow(
  rowData: Record<string, any>,
  rowIndex: number,
): Product {
  let score: number | null = null;
  const scoreValue = rowData["score"];
  if (scoreValue && scoreValue !== "N/A") {
    const scoreStr = String(scoreValue).replace(",", ".");
    const parsed = parseFloat(scoreStr);
    if (!isNaN(parsed)) {
      score = parsed;
    }
  }

  return {
    id: String(rowData["id"] || `PROD-${rowIndex}`),
    ean: String(rowData["ean"] || ""),
    name: String(rowData["name"] || ""),
    status: String(rowData["status"] || ""),
    score,
    miraklImage: String(rowData["mirakl_image"] || ""),
    bbImageUrl: String(rowData["bb_image_url"] || ""),
  };
}
