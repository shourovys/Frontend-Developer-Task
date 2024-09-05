const downloadCsv = (data: string, title: string) => {
  // Convert the data to a CSV string
  const csvContent = 'data:text/csv;charset=utf-8,' + data;

  // Create a link element to trigger the download
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', `${title ? title : 'data-list'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadCsv;
