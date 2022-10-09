import jspdf from 'jspdf';
import autoTable from 'jspdf-autotable';
import fonts from './fonts'

export default function ExportDoc({title, head, data,fontSize }) {

    const generatePDF = (type) => {
        const doc = new jspdf();
        doc.setFontSize(10)
        doc.text(10, 15, 'Matbakh24');
        doc.text(10, 25, 'Grouped Report');
        doc.addFileToVFS('Cairo-Regular.ttf', fonts[0])
        doc.addFont("Cairo-Regular.ttf", "Cairo", "normal");

        doc.setFont('Cairo');
        doc.setFontSize(10)
        // doc.autoTable(["الهيئة الملكية بالجبيل"], [["الهيئة الملكية بالجبيل"]], {
        //     startY: doc.autoTable() + 70,
        //     margin: { horizontal: 10 },
        //     styles: { overflow: "linebreak" ,font:"Cairo" ,align: 'right',halign: "right" },
        //     bodyStyles: { valign: "top",font:"Cairo",align: 'right' },
        //     columnStyles: { email: { columnWidth: "wrap",color:"white" ,font:"Cairo",align: 'right' } },
        //     align: 'right',
        //     showHead: "everyPage",
        //   });
        
        doc.text(200, 15, ' مطبخ 24/7 ','right');
         doc.text(200, 25, title,'right');
         var img = new Image()
         img.src = '../../img/m24logo -print.png';
         console.log(img);
         doc.addImage(img, 'png', 85, 5, 40, 40)

        // var imgData = 'data:image/jpeg;base64,'+ Base64.encode('Koala.jpeg');
        // console.log(imgData);
        // doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);

         doc.addFileToVFS('wadiy.ttf', fonts[1])
         doc.addFont("wadiy.ttf", "wadiy", "normal");
         doc.setFont('wadiy');
          doc.text(200, 43, title,'right');

    doc.autoTable(head, data, {
        startY: 50,
        margin: { horizontal: 10 },
        // bodyStyles: { valign: "top",font:"wadiy",align: 'right' },
        // columnStyles: { 
        //   fontSize: 12,
        //   font:"wadiy",
        //   align: 'right',
        //   weight:"bold",
        //   halign: "right",
        //   overflow: 'linebreak'
        // },
        styles: {
          fontSize: fontSize==null?10:fontSize,
          font:"wadiy",
          align: 'right',
          weight:"bold",
          columnWidth: 'auto',
          halign: "right",
          overflow: 'linebreak'
          },
           
             theme: "striped"
        ,
        align: 'right',
        showHead: "everyPage",
      });
       
      if(type == 'save'){
        doc.save(title+".pdf")

      }else{
        doc.autoPrint();  // <<--------------------- !!
doc.output('dataurlnewwindow');
      }

    }
    return <div>
        <button className='btn-pdf m-2 btn btn-outline-success ' onClick={() => generatePDF('save')}>تصدير </button>
        <button className='btn-pdf m-2 btn btn-outline-success' onClick={() => generatePDF('print')}>طباعة </button>
    </div>
}
