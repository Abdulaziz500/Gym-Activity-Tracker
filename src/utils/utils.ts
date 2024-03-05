
export function calculateAge(dateOfBirth:string) {
    const today = new Date();
    let [year, month, day] = dateOfBirth.split(/[\/-]/).map(Number); // Date of birth in yyyy/mm/dd format or in yyyy-mm-dd format
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the current month is before the birth month or the current month is the same as the birth month
    // but the current day is before the birth day, then subtract 1 from the age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}
