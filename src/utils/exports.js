import dayjs from "dayjs";

export const exportCSV = (data) => {
  const csvData = data
    .map((row) => {
      return {
        name: row.name,
        category: row.category,
        email: row.email,
        admin: row.admin,
        addedBy: row.addedBy,
        createdAt: dayjs(row.createdAt).format("DD MMM YYYY"),
      };
    })
    .map((row) => Object.values(row).join(","))
    .join("\n");
  const csvHeader =
    Object.keys(
      data.map((header) => {
        return {
          name: header.name,
          category: header.category,
          email: header.email,
          admin: header.admin,
          addedBy: header.addedBy,
          created: header.created,
        };
      })[0]
    ).join(",") + "\n";

  const csvContent = csvHeader + csvData;

  const blob = new Blob([csvContent], { type: "text/csv" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  link.download = `List_of_institution.csv`;

  link.click();
};
