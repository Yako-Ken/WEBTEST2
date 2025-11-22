// src/app/dashboard/product/[id]/edit/page.tsx

// 1. تعريف الواجهة بشكل منفصل وواضح
interface EditPageProps {
  params: { id: string };
}

// 2. استخدام async/await ليس ضروريًا إذا كنا سنطبع فقط
export default function SafeEditPage({ params }: EditPageProps) {
  
  // 3. طباعة الكائن `params` بالكامل قبل محاولة الوصول إليه
  console.log("[SafeEditPage] Received params object:", params);

  // 4. الوصول الآمن إلى `id` باستخدام التسلسل الاختياري (`?.`)
  const id = params?.id;

  console.log("[SafeEditPage] Safely accessed id:", id);

  // 5. عرض `id` على الشاشة للتأكد من أنه تم استلامه
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'white' }}>
      <h1>Safe Edit Page</h1>
      <p>Attempting to edit product with ID:</p>
      <pre style={{ background: '#333', padding: '1rem', borderRadius: '5px' }}>
        {id ? id : "ID not found in params!"}
      </pre>
      <hr style={{ margin: '2rem 0' }} />
      <h2>Full Params Object:</h2>
      <pre style={{ background: '#333', padding: '1rem', borderRadius: '5px' }}>
        {JSON.stringify(params, null, 2)}
      </pre>
    </div>
  );
}
