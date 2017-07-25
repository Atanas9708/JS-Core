class MailBox {
    constructor(){
        this.messages = [];
    }

    addMessage(subject, text){
        this.messages.push({
            subject: subject,
            text: text
        });

        return this;
    }
    get messageCount(){
        return this.messages.length;
    }
    deleteAllMessages(){
        this.messages.splice(0, this.messages.length);
    }
    findBySubject(substr){
        return this.messages.filter(s => s.subject.includes(substr));
    }
    toString(){
        if (this.messages.length === 0){
            return ' * (empty mailbox)';
        } else {
            let output = '';
            this.messages.forEach(m => output += ` * [${m.subject}] ${m.text}\n`);
            return output.substring(0, output.length - 1);
        }
    }
}

let mb = new MailBox();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
console.log("Messages holding 'rakiya': " +
    JSON.stringify(mb.findBySubject('rakiya')));
console.log("Messages holding 'ee': " +
    JSON.stringify(mb.findBySubject('ee')));

mb.deleteAllMessages();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);

console.log("New mailbox:\n" +
    new MailBox()
        .addMessage("Subj 1", "Msg 1")
        .addMessage("Subj 2", "Msg 2")
        .addMessage("Subj 3", "Msg 3")
        .toString());
