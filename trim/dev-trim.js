(() => {
  const el = document.querySelector('#faq-heading');
  if (!el) return console.error("❌ Element not found. Add id='faq-heading'");

  const rect = el.getBoundingClientRect();
  const fontSize = parseFloat(getComputedStyle(el).fontSize);

  // 🔹 Tworzy helper do linii overlay
  const line = (y, color, label) => {
    const div = document.createElement('div');
    Object.assign(div.style, {
      position: 'fixed',
      left: rect.left + 'px',
      width: rect.width + 'px',
      height: '1px',
      background: color,
      top: y + 'px',
      zIndex: 99999,
      pointerEvents: 'none'
    });
    const text = document.createElement('span');
    Object.assign(text.style, {
      position: 'fixed',
      left: (rect.left + rect.width + 8) + 'px',
      top: (y - 6) + 'px',
      color,
      fontSize: '11px',
      fontFamily: 'monospace',
      zIndex: 99999
    });
    text.textContent = label;
    document.body.appendChild(div);
    document.body.appendChild(text);
  };

  // 🔹 Dodajemy linie top / bottom
  line(rect.top, 'red', 'font box top');
  line(rect.bottom, 'red', 'font box bottom');

  // 🔹 Szacujemy baseline na podstawie x-height
  const test = document.createElement('span');
  test.textContent = 'Hxy';
  test.style.fontFamily = getComputedStyle(el).fontFamily;
  test.style.fontSize = fontSize + 'px';
  test.style.position = 'fixed';
  test.style.left = '-9999px';
  document.body.appendChild(test);
  const testRect = test.getBoundingClientRect();
  const baseline = testRect.bottom - (testRect.height * 0.25);
  document.body.removeChild(test);

  line(baseline, 'lime', 'baseline (approx)');

  // 🔹 Pomiar
  const topGap = baseline - rect.top - fontSize * 0.75;
  const bottomGap = rect.bottom - baseline - fontSize * 0.25;

  const trimTop = (topGap / fontSize).toFixed(3);
  const trimBottom = (bottomGap / fontSize).toFixed(3);

  console.log(`📏 Font size: ${fontSize}px`);
  console.log(`🔺 Trim top ≈ ${topGap.toFixed(2)}px (${trimTop}em)`);
  console.log(`🔻 Trim bottom ≈ ${bottomGap.toFixed(2)}px (${trimBottom}em)`);
  console.log('💡 Add this to CSS:');
  console.log(`margin-top: -${trimTop}em;`);
  console.log(`margin-bottom: -${trimBottom}em;`);
})();