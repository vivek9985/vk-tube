let currentCategory = 1000;
document.getElementById('sort-btn').addEventListener('click', function(){
    fetch(`https://openapi.programming-hero.com/api/videos/category/${currentCategory}`)
    .then(res => res.json())
    .then(data => {
        const videoCard = data.data
        videoCard.sort((a, b) => {
            return parseFloat(b.others.views) - parseFloat(a.others.views);
        })
        videoCardDisplay(videoCard);
    })
});
const updateCategroy = (updateId) => {
    currentCategory = parseInt(updateId)
}
const getCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    categories(data);
}
getCategory();
const categories = (data) => {
    data?.data?.forEach((category) => {
        const tabContainer = document.getElementById('tab-container');
        const itemdiv = document.createElement('div');
        itemdiv.innerHTML = `
            <div class="inline-flex rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 p-[1px] md:p-[2px}">
                <button id="${category?.category_id}" onclick="videoDisplay('${category?.category_id}') ; updateCategroy('${category?.category_id}') ; activeBtn(${category?.category_id})" class="w-full h-full font-medium py-1 md:py-1.5 px-3 md:px-7 rounded-xl bg-white hover:text-white hover:bg-transparent">${category?.category}</button>
            </div>
        `;
        tabContainer.appendChild(itemdiv);
    });
}
const videoDisplay = async (itemId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${itemId}`);
    const videoData = await res.json();
    const data = await videoData.data
    videoCardDisplay(data);
}
const videoCardDisplay = (videoData) => {
    const videoCardContainer = document.getElementById('video-card-container');
    const noContentContainer = document.getElementById('no-content');
    videoCardContainer.innerHTML = '';
    if (videoData.length === 0) {
        noContentContainer.innerHTML = '';
        const noContent = document.createElement('div');
        noContent.innerHTML = `
            <div class="w-full mx-auto mt-16">
                <div class="">
                    <img class="mx-auto" src="./assets/img/Icon.png" alt="">
                    <h2 class="text-3xl text-center font-bold mt-5">Oops!! Sorry, There is no <br> content here</h2>
                </div>
            </div>      
        `;
        noContentContainer.appendChild(noContent);
    }
    else {
        noContentContainer.innerHTML = '';
        videoData?.forEach((video) => {
            const videoCard = document.createElement('div');
            const time = video?.others?.posted_date;
            const hours = Math.floor((time / 60) / 60);
            const minutes = Math.floor((time / 60) % 60);
            videoCard.innerHTML = `
                <div class="rounded-lg overflow-hidden">
                    <div class="relative">
                        <img class="w-full h-[183px] rounded-lg" src="${video?.thumbnail}" alt="">
                        <p class="bg-gray-900 absolute text-xs text-gray-100 rounded-md pb-1 pt-0.5  bottom-2 right-2">${video?.others?.posted_date ? hours + 'hrs ' + minutes + 'min ' + 'ago' : ''}</p>
                    </div>
                    <div class="flex gap-2 mt-4">
                        <div>
                            <img class="w-11 h-11 rounded-full" src="${video?.authors[0]?.profile_picture}" alt="">
                        </div>
                        <div>
                            <h5 class="text-[18px] font-bold md:mb-1">${video?.title}</h5>
                            <p class="inline font-medium">${video?.authors[0]?.profile_name}</p>
                            <img src="${video?.authors[0]?.verified ? './assets/img/fi_10629607.svg' : ''}" alt="" class="inline-block w-4 h-4">
                            <h6 class="md:pt-1 pb-1 md:pb-4"><span>${video?.others?.views}</span> views</h6>
                        </div>
                    </div>
                </div>
            `;
            videoCardContainer.appendChild(videoCard);
        });
    }
}
// const activeBtn = (id) =>{
//     console.log(id)
//     const constainer = document.getElementById('tab-container');
//     const currentCategory = document.getElementById(id);
//     for(const child of currentCategory.children){
//         console.log(child)
//     }
// }
videoDisplay('1000');