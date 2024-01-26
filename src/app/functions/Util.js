export function formatDate(inputDateString) {
  const dateObject = new Date(inputDateString);

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('fr-FR', options);

  return formattedDate;
}

export function formatNumber(inputNumber) {
  const formattedNumber = Number(inputNumber).toLocaleString('en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  return `Ar ${formattedNumber}`;
}

export function formatNumber2(number) {
  const numberString = number?.toString();

  if (numberString?.length >= 3) {
    return numberString;
  } else {
    const numberOfZerosToAdd = 3 - numberString?.length;
    const zeros = '0'.repeat(numberOfZerosToAdd);
    return zeros + numberString;
  }
}

export function getStatus(index) {
  const status = ['Non valide', 'Non valide', 'Valide', 'Vendu'];

  return `${status[index]}`;
}

export function getStatAnnonceDataOfMonth(statAnnonce, status) {
  for (var i = 0; i < 3; i++) {
    if (statAnnonce?.[i]?.statut === status) {
      return statAnnonce?.[i]?.nombre_annonces;
    }
  }

  return 0;
}

export function getStatVenteDataOfYear(statVente, year) {
  const data = new Array(12).fill(null).map((_, index) => {
    const monthData = statVente?.find((item) => item.annee === year && item.mois === index + 1);
    return monthData ? monthData.total_comission : null;
  });

  // console.log(data);

  return {
    data,
    type: 'line',
    stack: year.toString(),
    name: year.toString(),
    smooth: true,
    symbolSize: 4,
    lineStyle: { width: 4 }
  };
}
