const promesseString = (str) => {
    return new Promise((resolve, failure) => {
        if (str.length <= 20) resolve(true);
        else failure("Erreur ! La string est trop longue");
    });
}

const promesseInt = (firstInt, secondInt) => {
    return new Promise((resolve, failure) => {
        if (firstInt > secondInt) resolve (firstInt - secondInt);
        else failure("Erreur ! La première valeur est < à la seconde");
    });
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/**
     * Création d'une date en partant d'une string au format fr (Jour/Mois/Année hh:mm)
     * @param {string} dateString Chaine de caractère représentant la date
     */
 const CreateDateFromFrenchString = function (dateString) {
    let splittedDate = dateString.split("/");

    let date = new Date(`${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`);
    return date
}

const promesseDate = (date) => {
    return new Promise((resolve, failure) => {
        let formatedDate = CreateDateFromFrenchString(date);
        if (getAge(formatedDate) >= 18) resolve(true);
        else failure("Erreur ! La personne est mineure");
    });
}

function executeThen() {
    try {
        promesseString("test test tes").then((res) => console.log(res));
        promesseInt(5, 3).then((res) => console.log(res));
        promesseDate("07/01/2000").then((res) => console.log(res));
    } catch(e) {
        console.log(e);
    }
}

async function executeAsync() {
    try {
        const firstPromess = await promesseString("test test tes");
        const secondPromess = await promesseInt(5, 3);
        const thirdPromess = await promesseDate("07/01/2000");
        console.log(firstPromess);
        console.log(secondPromess);
        console.log(thirdPromess);
    } catch(e) {
        console.log(e);
    }
}

executeThen();
executeAsync();

