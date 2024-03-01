const loadData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    const allData = data.data;
    const buttonContainer = document.getElementById("button-container");
    allData.forEach((item) => {
        // console.log(item);
        const button = document.createElement("button");
        button.addEventListener("click", () => buttonClick(item.category_id));
        button.className = "allBtn btn";
        button.innerText = item.category;
        buttonContainer.appendChild(button);
    });

    const buttons = document.querySelectorAll(".allBtn");
    for (const btn of buttons) {
        btn.addEventListener("click", () => {
            for (const b of buttons) {
                b.classList.remove("bg-red-500")
            }
            btn.classList.add("bg-red-500");
        })
    }

    // buttons.forEach((btn) => {
    //     btn.addEventListener("click", () => {
    //         buttons.forEach(btn => btn.classList.remove("bg-red-500"))
    //         btn.classList.add("bg-red-500")
    //     })
    // })

}
const sortedButton = document.getElementById("sortedButton");
let selectedCategory = 1000;
let selectedByView = false;
sortedButton.addEventListener("click", () => {
    selectedByView = true;
    buttonClick(selectedCategory,selectedByView)
})


const buttonClick = async (id, selectedByView) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    // console.log(data.data);
    const allCardData = data.data;


    if (selectedByView) {
        allCardData.sort((a, b) => {
            const totalViewFirst = a.others?.views;
            const totalViewSecond = b.others?.views;
            const totalViewFirstNumber = parseFloat(totalViewFirst.replace("k", "" || 0));
            const totalViewSecondNumber = parseFloat(totalViewSecond.replace("k", "" || 0))

            // console.log(totalViewFirst,totalViewSecond);
            return (totalViewSecondNumber - totalViewFirstNumber)
        })
    }





    const cardContainer = document.getElementById("card-container");
    cardContainer.innerText = " ";
    const emptyData = document.getElementById("empty-data")

    if (allCardData.length === 0) {
        emptyData.classList.remove("hidden")
    } else {
        emptyData.classList.add("hidden")
    }
    allCardData.forEach((category) => {
        let verified = '';
        if (category.authors[0].verified) {
            verified = `<img  src="icons/badge.png" alt="">`;
        }


        const div = document.createElement("div");
        div.innerHTML = `
         <div class="card  bg-base-100 shadow-xl">
                    <div class="relative">
                        <figure><img class="w-full h-[150px]" src="${category.thumbnail}"
                                alt="Shoes" />
                        </figure>
                        <p id="video-duration" class="absolute bottom-1  right-1">2m 4s</p>
                    </div>
                    <div class="flex justify-start  gap-4 px-1 mt-3">
                        <img class="w-10 h-10 rounded-full" src="${category.authors[0].profile_picture}" alt="">
                        <div>
                            <h2 class="text-2xl">${category.title}</h2>
                            <div class="flex  items-center gap-2">
                                <p>${category.authors[0].profile_name}</p>
                                ${verified}
                               
                               
                            </div>
                            <p class="pb-3">${category.others.views} views</p>
                        </div>
                    </div>
                </div>
         `;
        cardContainer.appendChild(div);
    })
}


buttonClick(selectedCategory, selectedByView)


loadData()