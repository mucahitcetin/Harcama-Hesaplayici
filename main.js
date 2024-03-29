const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const statusCheck = document.querySelector('#status-input');
const formBtn = document.querySelector('.ekle-btn');
const liste = document.querySelector('.liste');
const toplamBilgi = document.querySelector('#toplam-bilgi');
const selectFilter = document.querySelector('#filter-select');
const nameInput = document.querySelector('#name-input');

// tarayıcadan ismi alma
const username = localStorage.getItem('name') || '';

nameInput.value = username;

// kullnıcın girdiği ismi tarayıca depolamasında saklama
nameInput.addEventListener('change', (e) => {
    localStorage.setItem('name', e.target.value);
});

//izleme işlemleri
formBtn.addEventListener('click', addExpense);
liste.addEventListener('click', handleClick)
selectFilter.addEventListener('change', handleFilter);

//toplam state (durum)
let toplam = 0;

function updateToplam(fiyat) {
    toplam += Number(fiyat);
    toplamBilgi.innerText = ` ${toplam} TL`;
}

//harcama oluşturma
function addExpense(e) {
    e.preventDefault();  //sayfa yenilendiğinde oluşan şeyleri engelleme

    //doğrulama yapma (boş bırakılırsa..)
    if (!fiyatInput.value || !harcamaInput.value) {
        alert("Formları doldurunuz");
        return;
        /* return ü eklemesek if i yoksayıp devam eder, 
        şimdiyse if çalışırsa fonksiyonu durdurur. */
    }

    //div oluşturma
    const harcamaDiv = document.createElement('div');

    //class ekleme
    harcamaDiv.classList.add('harcama');
    /* payed class'ına sahip olursa ödemenin gerçekleştirildi anlamına gelir.*/
    if (statusCheck.checked) {
        harcamaDiv.classList.add('payed');
    }

    //içeriği ayarlama
    harcamaDiv.innerHTML = `
    <h2>${harcamaInput.value}</h2>
    <h2 id="value" >${fiyatInput.value}</h2>
    <div class="buttons">
      <img id="payment" src="/images/pay.png" />
      <img id="remove" src="/images/remove.png" />
    </div>
    `;

    //oluşan harcamayı html e gönderme (listeye ekleme)
    liste.appendChild(harcamaDiv);

    //toplamı güncelle
    updateToplam(fiyatInput.value);

    //formu temizleme
    harcamaInput.value = "";
    fiyatInput.value = "";
}

//listeye tıklanma olayını yönetme
function handleClick(e) {
    const element = e.target;

    if (element.id === 'remove') {
        //tıklanılan sil butonunun kapsayıcısını alma
        const wrapperElement = element.parentElement.parentElement;

        //silinen elemanın fiyatını alma
        const deletedPrice = wrapperElement.querySelector('#value').innerText;
        //silinenin fiyatını topşamdan çıkarma
        updateToplam(-Number(deletedPrice));


        //kapsayıcıyı html den kaldırma
        wrapperElement.remove();
    }
}

//filtreleme işlemi
function handleFilter(e) {
    const items = liste.childNodes;
    items.forEach((item) => {
        switch (e.target.value) {
            case 'all':
                item.style.display = 'flex';
                break;

            case 'payed':
                if (!item.classList.contains('payed')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex'
                }
                break;

            case "not-payed":
                if (item.classList.contains('payed')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
                break;
        }
    });
}

// Local  Storage > > veriler biz silene kadar durur
// Session   Storage > > veriler sekme kapatınca silinir

// setItem(anahtar,değer) >  veriyi depolama alanına koyar
localStorage.setItem('isim', 'denemelik veri');

// getItem(anahtar) > veriyi alıp getirir
const localVeri = localStorage.getItem('deneme');

// .removeItem() > veriyi siler
localStorage.removeItem('deneme');