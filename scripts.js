// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const photoGrid = document.getElementById('photo-grid');
    const uploadForm = document.getElementById('upload-form');
    const cartItems = document.getElementById('cart-items');

    if (uploadForm) {
        uploadForm.addEventListener('submit', event => {
            event.preventDefault();
            const title = document.getElementById('photo-title').value;
            const description = document.getElementById('photo-description').value;
            const fileInput = document.getElementById('photo-file');
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const photoDiv = document.createElement('div');
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = title;
                img.dataset.title = title;
                img.dataset.description = description;
                img.addEventListener('click', () => addToCart(img));
                photoDiv.appendChild(img);

                const descriptionPara = document.createElement('p');
                descriptionPara.textContent = description;
                photoDiv.appendChild(descriptionPara);

                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.addEventListener('click', () => addToCart(img));
                photoDiv.appendChild(addToCartButton);

                if (photoGrid) {
                    photoGrid.appendChild(photoDiv);
                }
            };

            if (file) {
                reader.readAsDataURL(file);
            }

            uploadForm.reset();
        });
    }

    function addToCart(img) {
        const title = img.dataset.title;
        const src = img.src;
        const description = img.dataset.description;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${title}</span>
            <img src="${src}" alt="${title}" width="50">
            <p>${description}</p>
            <button onclick="removeFromCart(this)">Remove</button>
        `;
        if (cartItems) {
            cartItems.appendChild(cartItem);
        }
    }

    window.removeFromCart = function(button) {
        const cartItem = button.parentElement;
        if (cartItems) {
            cartItems.removeChild(cartItem);
        }
    };
   
        
    });
    
    
    


