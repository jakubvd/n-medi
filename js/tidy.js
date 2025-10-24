(function () {
  function isOnlyWhitespace(node) {
    return node.nodeType === Node.TEXT_NODE && !node.textContent.trim();
  }

  function hasOnlyWhitespaceText(div) {
    for (const n of div.childNodes) {
      if (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length) return false;
    }
    return true;
  }

  // Kandydat na czyszczenie = <div> BEZ atrybutów (żadnych class/id/data/aria/style itd.)
  function isAttrLessDiv(el) {
    return el.tagName === 'DIV' && el.attributes.length === 0;
  }

  function cleanOnce(root = document) {
    let changed = false;
    const divs = root.querySelectorAll('div');

    divs.forEach(div => {
      if (!isAttrLessDiv(div)) return;

      // 1) PUSTY: brak dzieci elementów i brak tekstu
      const hasElementChildren = div.childElementCount > 0;
      const hasMeaningfulText =
        Array.from(div.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length);

      if (!hasElementChildren && !hasMeaningfulText) {
        div.remove();
        changed = true;
        return;
      }

      // 2) SINGLE-CHILD WRAPPER: dokładnie 1 dziecko element + brak znaczącego tekstu
      if (div.childElementCount === 1 && !hasMeaningfulText) {
        const onlyChild = div.firstElementChild;
        const parent = div.parentNode;
        if (parent && onlyChild) {
          parent.insertBefore(onlyChild, div); // przesuń dziecko „na miejsce” wrappera
          div.remove();                        // usuń wrapper
          changed = true;
        }
      }
    });

    return changed;
  }

  function cleanDeep(root = document) {
    // powtarzaj, aż nie będzie zmian (po unwrapie mogą pojawić się kolejne kandydaty)
    while (cleanOnce(root)) {}
  }

  // Uruchom po pełnym załadowaniu (CMS/sloty już w DOM)
  window.addEventListener('load', () => {
    // Mały rAF, żeby upewnić się, że Webflow dokończy mikro-zmiany
    requestAnimationFrame(() => cleanDeep(document));
  });
})();