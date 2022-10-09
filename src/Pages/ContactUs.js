export default function ContactUs(){
    return <div className="container contact">
    <form>
      <input type="email" placeholder="البريد الإلكتروني" />
      <input type="text" placeholder="عنوان الرسالة" />
      <textarea placeholder="نص الرسالة" defaultValue={""} />
      <input type="file" placeholder="الملفات" />

      <button type="button">إرسال </button>
    </form>
  </div>
}