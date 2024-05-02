import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: { severity: string, summary?: string, detail: string }[] = [];

  addSuccess(detail: string) {
    this.messages.push({ severity: 'success', detail });
  }

  addError(detail: string) {
    this.messages.push({ severity: 'error', detail });
  }

  clear() {
    this.messages = [];
  }

  getMessages() {
    return this.messages;
  }
}
