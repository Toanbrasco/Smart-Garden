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
    return str.substring(1)
}

export const numberFormat = (value) =>
    new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(value);

export const CategoryList = [
    { title: 'Béc tưới cây', list: ['Béc tưới góc bù áp', 'Béc tưới góc không bù áp', 'Béc tưới cánh đập', 'Béc tưới cây tỏa tròn', 'Dây tưới phun mưa', 'Béc tưới phun sương', 'Béc tưới khác'] },
    { title: 'Tưới nhỏ giọt', list: ['Ống dây tưới nhỏ giọt', 'Béc tưới nhỏ giọt', 'Bộ châm phân dinh dưỡng', ' Phụ kiện nhỉ giọt'] },
    { title: 'Bộ lọc nước tưới cây', list: [] },
    { title: 'Súng tưới cây', list: ['Súng tưới cây NODOLINI Ý', 'Súng tưới cây AUTOMAT INDIA', 'Súng tưới cây Trung Quốc', 'Súng tưới cây khác'] },
    { title: 'Van điện từ', list: [] },
    { title: 'Thiết bị tưới sân vườn', list: [] },
    { title: 'ống dẫn nước tưới cây', list: [] },
    { title: 'Bộ hẹn giờ', list: [] },
    { title: 'Phụ kiện tưới', list: [] },
    { title: 'Thiết bị tưới khác', list: [] }]

export const images = [
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60']

