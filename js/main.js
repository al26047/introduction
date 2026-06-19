const colorPicker = document.getElementById('my-color');

colorPicker.addEventListener('input', (e) => {
  const selectedColor = e.target.value;
  
  // <header> タグを直接取得
  const header = document.querySelector('header');
  
  // ヘッダーの「背景色」を変更する場合
  if (header) {
    header.style.color = selectedColor;
    
    // もし「文字色」を変えたい場合はこちら：
    // header.style.color = selectedColor;
  }
});