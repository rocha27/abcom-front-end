/**
 * Classe que agrupas todas as funcionalidades de interesse comum da aplicação
 */
export class Util {

    static isEmpty(valor:any): boolean {
        if(valor == undefined || valor == null || valor == '' || valor.length == 0 || valor.toString().trim().length == 0){
            return true;
        }
        return false;
    }

    /**
     * Recupera as mensagens na resposta, contida nas transações
     *
     * @param error
     */
    static getMessageResponse(error: any): any[] {
        let mensagens = [];
        if(error){
            if(error.message){
                mensagens.push(error.message);
            }else if(error.transacao && error.transacao.mensagem){
                error.transacao.mensagem.forEach(item => {
                    mensagens.push(item.descricao);
                });
            }
        }
        return mensagens;
    }

}
