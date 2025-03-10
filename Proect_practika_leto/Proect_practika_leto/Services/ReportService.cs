using System;
using System.ComponentModel;
using System.IO;
using System.Linq;
using OfficeOpenXml;
using Proect_practika_leto.DTO;  // Подключаем контекст БД

namespace Proect_practika_leto.Services
{
    public class ReportService
    {
        private readonly DbPractickaContext _context;

        public ReportService(DbPractickaContext context)
        {
            _context = context;
        }

        public byte[] GenerateStockReport()
        {


            using (var package = new ExcelPackage())
            {
                // Создаем новый лист в файле Excel
                var sheet = package.Workbook.Worksheets.Add("Запасы на складе");

                // Заголовки колонок
                sheet.Cells[1, 1].Value = "Материал";
                sheet.Cells[1, 2].Value = "Склад";
                sheet.Cells[1, 3].Value = "Остаток";

                // Запрос данных из БД
                var data = _context.DocumentsMovementMaterials
                    .GroupBy(dm => new { dm.Material.NameMaterial, dm.WareHouseRecipient.Name })
                    .Select(g => new
                    {
                        Material = g.Key.Name,
                        Warehouse = g.Key.Name,
                        Stock = g.Sum(dm => dm.QuantityMaterial)
                    }).ToList();

                // Заполняем строки данными
                int row = 2;
                foreach (var item in data)
                {
                    sheet.Cells[row, 1].Value = item.Material;
                    sheet.Cells[row, 2].Value = item.Warehouse;
                    sheet.Cells[row, 3].Value = item.Stock;
                    row++;
                }

                // Возвращаем Excel-файл в виде массива байтов
                return package.GetAsByteArray();
            }
        }
    }
}
