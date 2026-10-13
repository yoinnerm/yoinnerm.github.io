export function getMascotAnswer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('precio') || q.includes('costo') || q.includes('cuanto') || q.includes('cotiz')) {
    return '¡Hola! En Tortas Alicar cada creación es única y personalizada según el número de porciones, bizcocho, relleno y decoración. Por eso no manejamos precios fijos en la web. La mejor manera de recibir tu presupuesto exacto es haciendo clic en el botón flotante de WhatsApp (+58 414 461 7554), donde mi madre Yanacari te atenderá con todo el cariño.';
  }
  if (q.includes('donde') || q.includes('ubicac') || q.includes('direccion') || q.includes('maracay') || q.includes('santa rita')) {
    return '¡Estamos ubicados en Maracay, Estado Aragua, específicamente en el tradicional barrio de Santa Rita! Desde aquí elaboramos con amor todas las creaciones familiares desde los años 80.';
  }
  if (q.includes('historia') || q.includes('alida') || q.includes('yanacari') || q.includes('origen') || q.includes('quienes')) {
    return '¡Nuestra historia es puro amor familiar! Comenzó en la década de 1980 con la abuela Alida y hoy es continuada por su hija Yanacari. El nombre "Alicar" nace de la unión de Alida y Yanacari. Mantenemos las recetas tradicionales y las técnicas artesanales que han acompañado a generaciones de familias en Maracay.';
  }
  if (q.includes('curso') || q.includes('taller') || q.includes('aprender')) {
    return '¡Qué alegría que quieras aprender! En Tortas Alicar ofrecemos cursos de repostería práctica (desde batidos perfectos hasta técnicas de boquillas y merengue). Puedes pulsar el botón "Información" en la sección de Cursos para conversar directamente por WhatsApp (+58 414 461 7554) y conocer las próximas fechas.';
  }
  if (q.includes('kit') || q.includes('emprended')) {
    return '¡Apoyamos con entusiasmo a quienes desean emprender en el dulce mundo de la repostería! Ofrecemos Kits para Emprendedores con herramientas y guías básicas. Para consultar disponibilidad y contenido del kit, pulsa el botón "Información" que te conectará por WhatsApp con Yanacari.';
  }
  if (q.includes('gelatina') || q.includes('pasapalo') || q.includes('galleta') || q.includes('servicio')) {
    return 'Además de nuestras reconocidas tortas y pasteles de celebración, elaboramos gelatinas artísticas 3D encapsuladas, pasapalos dulces y salados (como los deliciosos tequeños de hojaldre) y galletas decoradas para eventos familiares.';
  }
  if (q.includes('horario') || q.includes('hora') || q.includes('contacto')) {
    return 'Puedes escribirnos en cualquier momento. En nuestro formulario de contacto puedes elegir tu horario preferido: en la mañana (9:00 a 13:00) o en la tarde (14:00 a 20:00). ¡También puedes escribirnos a alicartortas@gmail.com o directamente al WhatsApp +58 414 461 7554!';
  }
  if (q.includes('nombre') || q.includes('quien eres') || q.includes('como te llamas')) {
    return '¡Hola! No tengo un nombre propio; soy la pequeña mascota repostera de Tortas Alicar. Mi misión en esta página es acompañarte, guiarte por las distintas secciones y darte toda la información sobre las creaciones de Yanacari.';
  }

  return '¡Bienvenido a Tortas Alicar! Soy la mascota repostera y estoy aquí para guiarte por nuestro sitio. Te invito a explorar nuestra Historia familiar, la Galería interactiva con nuestras mejores tortas y gelatinas, o los Cursos y Kits para emprendedores. Si deseas un presupuesto personalizado, puedes pulsar el botón verde de WhatsApp (+58 414 461 7554). ¿Hay algo específico sobre lo que te gustaría saber?';
}
