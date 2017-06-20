function gradsToDegrees(grads) {

    let degrees = ((grads * 360) / 400) % 360;
    degrees = degrees < 0 ? degrees + 360 : degrees;

    console.log(degrees);
}