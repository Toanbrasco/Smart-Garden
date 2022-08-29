export const convertViToEn = (str, toUpperCase = false) => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    str = str.replace(/\s/g, '-'); // Â, Ê, Ă, Ơ, Ư
    // console.log(str)
    return str
}

export const numberFormat = (value) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(value);

export const DayFormat = (date, type) => {
    const value = new Date(date);
    switch (type) {
        case "DATE":
            return `${value.toLocaleDateString("vi-VN")}`
        case "TIME":
            return ` ${value.toLocaleTimeString("vi-VN")}`
        default:
            return `${value.toLocaleDateString("vi-VN")} | ${value.toLocaleTimeString("vi-VN")}`
    }
}
// value.toLocaleString('en-GB', { year: 'numeric', day: 'numeric', month: 'numeric', hour12: false }).replace('T', " | ").slice(0, -5)

// let day = d.toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' }).
//     replace(/(\d+)\/(\d+)\/(\d+)/, '$2-$1-$3');
// let time = d.toTimeString().slice(0, 10).replace(/-/g, "").replace('G', "")

export const CategoryList = [
    { title: 'Béc tưới cây', list: ['Béc tưới góc bù áp', 'Béc tưới góc không bù áp', 'Béc tưới cánh đập', 'Béc tưới cây tỏa tròn', 'Dây tưới phun mưa', 'Béc tưới phun sương', 'Béc tưới khác'] },
    { title: 'Tưới nhỏ giọt', list: ['Ống dây tưới nhỏ giọt', 'Béc tưới nhỏ giọt', 'Bộ châm phân dinh dưỡng', ' Phụ kiện nhỉ giọt'] },
    { title: 'Súng tưới cây', list: ['Súng tưới cây NODOLINI Ý', 'Súng tưới cây AUTOMAT INDIA', 'Súng tưới cây Trung Quốc', 'Súng tưới cây khác'] },
    { title: 'Bộ lọc nước', list: [] },
    { title: 'Van điện từ', list: [] },
    { title: 'Thiết bị tưới sân vườn', list: [] },
    { title: 'Ống dẫn nước', list: [] },
    { title: 'Bộ hẹn giờ', list: [] },
    { title: 'Phụ kiện tưới', list: [] },
    // { title: 'Thiết bị tưới khác', list: [] }
]

export const images = [
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60']

export const personImage = 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png'

export const fakeOrderArr = [
    {
        name: 'Nguyễn Văn A',
        adress: 'Số 1A, HCM',
        phone: '0123456789',
        note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores itaque, aliquam mollitia reiciendis eos sapiente incidunt ut aliquid odio porro voluptatem.Aliquid placeat soluta laboriosam qui vel, veritatis consectetur!',
        shipping: 'Giao hàng tận nhà',
        payment: 'Thanh toán bằng thẻ',
        cart: ['615675185d27f4331cc3c844', '615675215d27f4331cc3c84a', '6156752a5d27f4331cc3c850'],
        status: 'Đang giao hàng',
        createdAt: "2022-07-06T23:41:58.000Z"
    },
    {
        name: 'Nguyễn Văn A',
        adress: 'Số 1A, HCM',
        phone: '0123456789',
        note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores itaque, aliquam mollitia reiciendis eos sapiente incidunt ut aliquid odio porro voluptatem.Aliquid placeat soluta laboriosam qui vel, veritatis consectetur!',
        shipping: 'Giao hàng tận nhà',
        payment: 'Thanh toán bằng thẻ',
        cart: ['615675185d27f4331cc3c844', '6156752a5d27f4331cc3c850'],
        status: 'Chưa giải quết',
        createdAt: "2022-07-06T23:41:58.000Z"
    },
    {
        name: 'Nguyễn Văn A',
        adress: 'Số 1A, HCM',
        phone: '0123456789',
        note: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores itaque, aliquam mollitia reiciendis eos sapiente incidunt ut aliquid odio porro voluptatem.Aliquid placeat soluta laboriosam qui vel, veritatis consectetur!',
        shipping: 'Giao hàng tận nhà',
        payment: 'Thanh toán bằng thẻ',
        cart: ['615675185d27f4331cc3c844', '615675215d27f4331cc3c84a'],
        status: 'Hoàn thành',
        createdAt: "2022-07-06T23:41:58.000Z"
    }
]
// export const arrMenu = [
//     // { name: 'Home', icon: faHome },
//     // { name: 'Table', icon: faTableList },
//     { name: 'Product', icon: faBox, component: 2, path: ['products', 'product-upload'] },
//     { name: 'Post', icon: faNewspaper, component: 2, path: ['blog', 'services', 'blog-upload', 'services-upload'] },
//     { name: 'Config', icon: faWrench, component: 1, path: 'config' },
//     { name: 'Order', icon: faClipboardCheck, component: 1, path: 'order' },
//     { name: 'User', icon: faUser, component: 1, path: 'user' }
// ]

export const totalAmount = (cart, products) => {
    let total = 0
    filterCart(cart, products).forEach(item => {
        total = total + item.count
    })
    return total
}
export const totalPrice = (cart, products) => {
    let total = 0
    filterCart(cart, products).forEach(item => {
        total = total + item.count * item.price.base
    })
    return total
}

export const filterCart = (carts, product) => {
    // console.log('Test:', carts.data, product.data)
    let arr = []
    if (carts.data && product.data) {
        product.data.forEach(item => {
            carts.data.forEach((cart) => {
                if (JSON.stringify(item._id) === JSON.stringify(cart._id)) {
                    item['count'] = cart.count
                    arr.push(item)
                }
            })
        })
    } else {
        product.data.forEach(item => {
            carts.forEach((cart) => {
                if (JSON.stringify(item._id) === JSON.stringify(cart._id)) {
                    item['count'] = cart.count
                    arr.push(item)
                }
            })
        })
    }
    // console.log("arr", arr)
    return arr
}
export const makeNumArr = num => new Array(num).fill("").map((_, i) => i + 1);

export const UrlApi = 'https://smartgarden-server-test.herokuapp.com'
// 'http://localhost:5000'




export const SESSION_STORAGE_TOKEN_NAME = 'smart-garden'
