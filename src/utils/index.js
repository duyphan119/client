import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export const castToVND = (price) => {
  if (!price) return 0;
  price = price.toLocaleString("vi", { style: "currency", currency: "VND" });
  return price;
};

export const formatDate = (input) => {
  try {
    const date = new Date(+input);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month >= 10 ? month : "0" + month}-${
      day >= 10 ? day : "0" + day
    }`;
  } catch (error) {
    return "";
  }
};

export const formatTime = (input) => {
  try {
    const date = new Date(+input);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${hour >= 10 ? hour : "0" + hour}:${
      minute >= 10 ? minute : "0" + minute
    }:${second >= 10 ? second : "0" + second}`;
  } catch (error) {
    return "";
  }
};

export const formatDateTime = (input) => {
  try {
    return `${formatDate(input)} ${formatTime(input)}`;
  } catch (error) {
    return "";
  }
};

export const exportComponentToPDF = (id) => {
  const input = document.getElementById(id);

  input.style.transform = `scale(${896 / input.getBoundingClientRect().width})`;
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("img/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
    });

    pdf.addImage(imgData, "PNG", 1, 1);
    pdf.save("File.pdf");
  });
  input.style.transform = `scale(1)`;
};
