export function isValidCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, '');

    if (cleanedCPF.length !== 11) {
        return false;
    }

    if (/^(\d)\1{10}$/.test(cleanedCPF)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let mod = sum % 11;
    const digit1 = mod < 2 ? 0 : 11 - mod;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    mod = sum % 11;
    const digit2 = mod < 2 ? 0 : 11 - mod;

    return (
        cleanedCPF.charAt(9) === digit1.toString() &&
        cleanedCPF.charAt(10) === digit2.toString()
    );
}

export function applyCEPFormat(cep: string): string {
    const cleanedCEP = cep.replace(/\D/g, '');
  
    const maskedCEP = cleanedCEP.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');
  
    return maskedCEP;
}

export function maskCPF(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskRG(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskTelefone(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
}