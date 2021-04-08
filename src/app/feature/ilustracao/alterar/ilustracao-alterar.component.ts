import {Component, OnInit} from '@angular/core';
import {Entidade} from '../../../shared/model/entidade';
import {EntidadeService} from '../../../shared/client/entidade/entidade.service';
import {AppMessageService} from '../../../shared/core/message/app-message.service';
import {TranslateService} from '@ngx-translate/core';
import {LoaderService} from '../../../shared/core/loader/loader.service';
import {NgForm} from '@angular/forms';
import {Util} from '../../../shared/util/util';
import {ActivatedRoute} from '@angular/router';
import {Address} from '../../../shared/model/address';
import {Contact} from '../../../shared/model/contact';
import {Representative} from '../../../shared/model/representative';
import {Country} from '../../../shared/model/contactRepresentative';
import {UtilService} from '../../../shared/service/util.service';
import {ConfirmationService} from 'primeng/api';
import {RepresentativeService} from '../../../shared/client/representante/representative.service';

@Component({
    selector: 'app-ilustracao-alterar',
    templateUrl: './ilustracao-alterar.component.html'
})
export class IlustracaoAlterarComponent implements OnInit {

    representative: Representative[];
    registro: Entidade = new Entidade();
    address: Address = new  Address();
    contact: Contact = new Contact();
    listAddress: Address[] = [];
    listContact: Contact[] = [];
    listRepresentative: Representative[] = [];
    indexAddress: number;
    indexContact: number;
    next = false;
    showEditAddress = false;
    showEditContact = false;
    showAddress = false;
    ListCountry: Country;

    constructor(private entidadeService: EntidadeService,
                private appMessageService: AppMessageService,
                private representanteService: RepresentativeService,
                private confirmationService: ConfirmationService,
                private translateService: TranslateService,
                private getAddressService: UtilService,
                private activatedRoute: ActivatedRoute,
                private loaderService: LoaderService) {

        this.registro = activatedRoute.snapshot.data.entidadeResponse;
    }

    async ngOnInit() {
        this.getCountry();
        const lista = await this.representanteService.listaRepresentanteEntidade(this.registro.id);
        this.listRepresentative = lista;
    }

    save(form: NgForm) {
        if (form.valid) {
            this.loaderService.onStart.emit();
            this.entidadeService.salvarDados(this.registro).then(response => {
                this.registro = response.conteudo;
                this.next = true;
                this.loaderService.onStop.emit();
                this.appMessageService.addMsgSuccess
                (this.translateService.instant('COMUM.MESSAGE.RECORD_SAVE_SUCCESSFULLY'));
            }).catch(error => {
                this.loaderService.onStop.emit();
                this.appMessageService.addMsgDanger(Util.getMessageResponse(error.error).join(', '));
                this.next = false;
            });
        } else {
            this.appMessageService.addMsgDanger
            (this.translateService.instant('COMUM.MESSAGE.REQUIRED_FIELD_ALL'));
            this.next = false;
        }
    }

    /**
     * @param formTwo
     */
    validAddress(formTwo: NgForm) {
        formTwo.valid ? this.saveAddress(formTwo) :
            this.appMessageService.addMsgDanger
            (this.translateService.instant('COMUM.MESSAGE.REQUIRED_FIELD_ALL'));
    }

    private saveAddress(formTwo: NgForm) {
        if (this.showEditAddress) {
            this.loaderService.onStart.emit();
            setTimeout(() => {
                this.listAddress.map( (obj, i) => {
                    if (i === this.indexAddress) {
                        obj.cep = this.address.cep;
                        obj.bairro = this.address.bairro;
                        obj.municipio = this.address.bairro;
                        obj.complemento = this.address.complemento;
                        obj.numero = this.address.numero;
                        obj.logradouro = this.address.logradouro;
                        obj.uf = this.address.uf;
                    }
                    this.address = new Address();
                    formTwo.reset();
                    this.appMessageService.addMsgSuccess
                    (this.translateService.instant('COMUM.MESSAGE.RECORD_UPDATE_SUCCESSFULLY'));
                    return obj;
                });
                this.loaderService.onStop.emit();
                this.showEditAddress = false;
            }, 1000);
        } else {
            this.loaderService.onStart.emit();
            setTimeout(() => {
                this.listAddress.push(this.address);
                this.address = new  Address();
                formTwo.reset();
                this.appMessageService.addMsgSuccess
                (this.translateService.instant('COMUM.MESSAGE.RECORD_SAVE_SUCCESSFULLY'));
                this.loaderService.onStop.emit();
            }, 1000);
        }
    }

    async getAdress() {
        if (this.address.cep !== undefined && this.address.cep !== '' && this.address.cep !== null) {
            this.address.cep = this.address.cep.replace(/[^\d]+/g, '');
            this.loaderService.onStart.emit();
            const result =  await this.getAddressService.buscarCep(this.address.cep);
            if (result && !result.error) {
                this.address = result;
            } else {
                this.validGetCep(result);
            }
            this.loaderService.onStop.emit();
        }
    }

    /**
     * @param address
     * @param index
     */
    editAddress(address: Address, index) {
        this.showEditAddress = true;
        this.indexAddress = index;
        this.address.cep = address.cep;
        this.address.bairro = address.bairro;
        this.address.municipio = address.bairro;
        this.address.complemento = address.complemento;
        this.address.numero = address.numero;
        this.address.logradouro = address.logradouro;
        this.address.uf = address.uf;
    }

    /**
     * @param address
     * @param view
     */
    viewAddress(address, view) {
        view ? this.showAddress = true : this.showAddress = false;
        this.address = address;
    }

    /**
     * @param index
     */
    private deleteAddress(index) {
        this.confirmationService.confirm({
            message: 'Deseja Excluir ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loaderService.onStart.emit();
                setTimeout(() => {
                    this.listAddress.splice(this.listAddress.indexOf(index, index));
                    this.appMessageService.addMsgSuccess
                    (this.translateService.instant('COMUM.MESSAGE.RECORD_DELETE_SUCCESSFULLY'));
                    this.loaderService.onStop.emit();
                }, 1000);
            }
        });
    }

    /**
     * @param index
     */
    private deleteVinculo(index, representative: Representative) {
        this.confirmationService.confirm({
            message: 'Deseja Excluir ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loaderService.onStart.emit();
                setTimeout(() => {
                    this.entidadeService.deletarVinculo(representative.id);
                    this.listRepresentative.splice(this.listRepresentative.indexOf(index, index));
                    this.appMessageService.addMsgSuccess
                    (this.translateService.instant('COMUM.MESSAGE.RECORD_DELETE_SUCCESSFULLY'));
                    this.loaderService.onStop.emit();
                }, 1000);
            }
        });
    }

    /**
     * @param formThree
     */
    validContact(formThree: NgForm) {
        formThree.valid ? this.saveContact(formThree) :
            this.appMessageService.addMsgDanger
            (this.translateService.instant('COMUM.MESSAGE.REQUIRED_FIELD_ALL'));
    }
    /**
     * @param formThree
     */
    private saveContact(formThree: NgForm) {
        if (this.showEditContact) {
            this.loaderService.onStart.emit();
            setTimeout(() => {
                this.listContact.map( (obj, i) => {
                    if (i === this.indexContact) {
                        obj.pais = this.contact.pais;
                        obj.ramal = this.contact.ramal;
                        obj.pagina = this.contact.pagina;
                        obj.email = this.contact.email;
                        obj.telefone = this.contact.telefone;
                    }
                    this.contact = new Contact();
                    formThree.reset();
                    this.appMessageService.addMsgSuccess
                    (this.translateService.instant('COMUM.MESSAGE.RECORD_UPDATE_SUCCESSFULLY'));
                    return obj;
                });
                this.loaderService.onStop.emit();
                this.showEditContact = false;
            }, 1000);
        } else {
            this.loaderService.onStart.emit();
            setTimeout(() => {
                this.listContact.push(this.contact);
                this.contact = new  Contact();
                formThree.reset();
                this.appMessageService.addMsgSuccess
                (this.translateService.instant('COMUM.MESSAGE.RECORD_SAVE_SUCCESSFULLY'));
                this.loaderService.onStop.emit();
            }, 1000);
        }
    }


    /**
     * @param contact
     * @param index
     */
    editContact(contact: Contact, index: number) {
        this.showEditContact = true;
        this.indexContact = index;
        this.contact.pais = contact.pais;
        this.contact.ramal = contact.ramal;
        this.contact.pagina = contact.pagina;
        this.contact.email = contact.email;
        this.contact.telefone = contact.telefone;
    }

    /**
     * @param index
     */
    private deleteContact(index) {
        this.confirmationService.confirm({
            message: 'Deseja Excluir ?',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: () => {
                this.loaderService.onStart.emit();
                setTimeout(() => {
                    this.listContact.splice(this.listContact.indexOf(index, index));
                    this.appMessageService.addMsgSuccess
                    (this.translateService.instant('COMUM.MESSAGE.RECORD_DELETE_SUCCESSFULLY'));
                    this.loaderService.onStop.emit();
                }, 1000);
            }
        });
    }

    async buscaRepresentante(event) {
        const query = event.query;
        const response = await this.representanteService.buscarRepresentanteSgcam(query);
        this.representative = response;
    }


    /**
     * @param representative
     */
    vincularRepresentative(representative) {
        this.loaderService.onStart.emit();
        setTimeout(() => {
            if (representative.id && this.registro.id) {
                const vinculo = {idEntidade: this.registro.id , idRepresentante: representative.id};
                this.entidadeService.vincularRepresentante(vinculo).then(res => {
                    this.appMessageService.addMsgSuccess
                    (this.translateService.instant('COMUM.MESSAGE.RECORD_SAVE_SUCCESSFULLY'));
                    this.listRepresentative.push(representative);
                }).catch(error => {
                    this.loaderService.onStop.emit();
                    this.appMessageService.addMsgDanger
                    (this.translateService.instant(error.message));
                });
                this.loaderService.onStop.emit();
            } else {
                this.appMessageService.addMsgDanger
                (this.translateService.instant('Nenhum registro encotrado'));
                this.loaderService.onStop.emit();
            }
        }, 1000);
    }

    /**
     * @param result
     */
    validGetCep(result) {
        if (result && result.error) {
            this.appMessageService.addMsgDanger
            (this.translateService.instant(result.error.message));
            this.loaderService.onStop.emit();
            this.address = new Address();
        } else {
            this.appMessageService.addMsgWarning
            (this.translateService.instant('COMUM.MESSAGE.NOT_FOUND_CEP'));
            this.address = new Address();
            this.loaderService.onStop.emit();
        }
    }

    async getCountry() {
        this.ListCountry = await this.getAddressService.getListCountry();
    }

    cleanAddress() {
        this.address = new Address();
        this.showEditAddress = false;
    }

    closedViewAddress() {
        this.showAddress = false;
        this.showEditContact = false;
        this.address = new Address();
    }

    cleanContact() {
        this.contact = new Contact();
        this.showEditContact = false;
    }

    clean() {
        this.registro = new Entidade();
    }

    goBack() {
        window.history.back();
    }

}
