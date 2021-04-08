export class AddressRepresentative {
    idPessoa: number;
    cep: string;
    tipoEndereco: TypeAddress;
    uf: string;
    municipio: string;
    bairro: string;
    logradouro: string;
    complemento: string;
    numero: string;
 }

export class TypeAddress {
    descricao: string;
    codigo: string;
}
