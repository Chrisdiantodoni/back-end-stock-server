const fs = require("fs");
const path = require("path");
const fastcsv = require("fast-csv");

async function exportCSV(data, res, type, filename) {
  try {
    const directory = type;
    const filePath = path.join(
      __dirname, // Use the current directory of this module as the base
      "..",
      "uploads",
      "csv",
      directory,
      filename
    );

    const stream = fs.createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      fastcsv
        .write(data, { headers: true })
        .on("finish", resolve)
        .on("error", reject)
        .pipe(stream);
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on("end", () => {
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error("CSV export error:", error);
    res.status(500).json({ error: "CSV export failed" });
  }
}

module.exports = exportCSV;
