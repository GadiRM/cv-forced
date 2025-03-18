function change_status(num) {
    $("#me, #exp, #inf").removeClass("activated");
    $("#about_me, #previous_experience, #educacion").addClass("hidden");

    if (num === 1) {
        $("#me").addClass("activated");
        $("#about_me").removeClass("hidden");
    } else if (num === 2) {
        $("#exp").addClass("activated");
        $("#previous_experience").removeClass("hidden");
    } else if (num === 3) {
        $("#inf").addClass("activated");
        $("#educacion").removeClass("hidden");
    }
}

function change_view() {
    if ($("#header").hasClass("hidden")) {
        $("#header").removeClass("hidden");
        $("#previous_experience, #educacion, #dowload_pdf_button").addClass("hidden");
    } else {
        $("#header").addClass("hidden");
        $("#about_me, #previous_experience, #educacion, #dowload_pdf_button").removeClass("hidden");
    }

    // Cambiar el texto del botón
    var button = $("#cv_button");
    if (button.text().includes("Modo CV")) {
        button.text("Modo Web");
    } else {
        button.text("Modo CV");
    }  
}

function downloadPDF() {
    // Ocultar elementos no deseados
    $("#change_watch_mode, #header").addClass("hidden");

    // Seleccionar el contenido a convertir en PDF
    var element = document.getElementById("content"); // Puedes cambiarlo por otro div si necesitas

    html2pdf()
        .set({
            margin: 10,
            filename: "CV_Gadi_Rebolledo.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        })
        .from(element)
        .save()
        .then(() => {
            // Restaurar elementos ocultos después de generar el PDF
            $("#change_watch_mode, #header").removeClass("hidden");
        });
}


function downloadPDF() {
    // Ocultar elementos no deseados
    $("#change_watch_mode").addClass("hidden");

    var { jsPDF } = window.jspdf;
    var doc = new jsPDF({
        orientation: "portrait", // Puedes cambiar a "landscape" si lo prefieres
        unit: "mm",
        format: "a4", // Asegura que el PDF tenga tamaño A4
        compress: true
    });

    doc.html(document.getElementById("content"), {
        callback: function (pdf) {
            pdf.save("CV_Gadi_Rebolledo.pdf");

            // Restaurar elementos ocultos DESPUÉS de generar el PDF
            $("#change_watch_mode").removeClass("hidden");
        },
        x: 0,  // Elimina margen izquierdo
        y: 0,  // Elimina margen superior
        width: 210,  // Ajusta al ancho total de A4 (210mm)
        windowWidth: document.getElementById("content").scrollWidth,
        scale: 1 // Mantiene el tamaño real sin reducirlo
    });
}
