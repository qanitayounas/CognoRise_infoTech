function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert cm to meters

    const categoryImage = document.getElementById('categoryImage');

    if (weight > 0 && height > 0) {
        const bmi = (weight / (height * height)).toFixed(2);
        document.getElementById('bmiResult').textContent = `Your BMI: ${bmi}`;

        let category = '';
        let imgSrc = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            imgSrc = 'underweight.png';
            document.getElementById('bmiCategory').style.color = '#ffc107';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
            imgSrc = 'normal.png';
            document.getElementById('bmiCategory').style.color = '#28a745';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
            imgSrc = 'overweight.png';
            document.getElementById('bmiCategory').style.color = '#ff851b';
        } else {
            category = 'Obese';
            imgSrc = 'obese.png';
            document.getElementById('bmiCategory').style.color = '#dc3545';
        }

        document.getElementById('bmiCategory').textContent = `Category: ${category}`;
        categoryImage.src = imgSrc;
        categoryImage.style.display = 'block';
    } else {
        document.getElementById('bmiResult').textContent = 'Please enter valid values.';
        document.getElementById('bmiCategory').textContent = '';
        categoryImage.style.display = 'none';
    }
}
