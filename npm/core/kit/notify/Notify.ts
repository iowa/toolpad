import { ShowNotification, ShowNotificationOptions } from "../../toolpad-core/useNotifications";

export class Notify {
  private readonly show: ShowNotification

  constructor(show: ShowNotification) {
    this.show = show
  }

  static createSuccessMsg(resource: string, id?: string): string {
    return id ? `Created ${resource} ${id}` : `Created ${resource}`
  }

  static createErrorMsg(resource: string): string {
    return `Error creating ${resource}`
  }

  static deleteSuccessMsg(resource: string, id?: string): string {
    return id ? `Deleted ${resource} ${id}` : `Deleted ${resource}`
  }

  static deleteErrorMsg(resource: string, id?: string): string {
    return id ? `Error deleting ${resource} ${id}` : `Error deleting ${resource}`
  }

  static editSuccessMsg(resource: string, id?: string): string {
    return id ? `Edited ${resource} ${id}` : `Edited ${resource}`
  }

  static editErrorMsg(resource: string, id?: string): string {
    return id ? `Error editing ${resource} ${id}` : `Error editing ${resource}`
  }

  success(msg: string, options?: ShowNotificationOptions) {
    this.show('msg', { severity: 'success', ...options })
  }

  error(msg: string, options?: ShowNotificationOptions) {
    this.show('msg', { severity: 'error', ...options })
  }

  createSuccess(msg: {
    resource: string,
    id?: string
  }, options?: ShowNotificationOptions) {
    this.show(Notify.createSuccessMsg(msg.resource, msg.id), { severity: 'success', ...options })
  }

  createError(msg: {
    resource: string,
    id?: string
  }, options?: ShowNotificationOptions) {
    this.show(Notify.createErrorMsg(msg.resource), { severity: 'error', ...options })
  }

  deleteSuccess(msg: {
    resource: string,
    id?: string
  }, options?: ShowNotificationOptions) {
    this.show(Notify.deleteSuccessMsg(msg.resource, msg.id), { severity: 'success', ...options })
  }

  deleteError(msg: {
    resource: string,
    id?: string
  }, options?: ShowNotificationOptions) {
    this.show(Notify.deleteErrorMsg(msg.resource, msg.id), { severity: 'error', ...options })
  }

  editSuccess(msg: {
    resource: string,
    id?: string
  }, options?: ShowNotificationOptions) {
    this.show(Notify.editSuccessMsg(msg.resource, msg.id), { severity: 'success', ...options })
  }

  editError(msg: {
    resource: string,
    id?: string
  }, options?: ShowNotificationOptions) {
    this.show(Notify.editErrorMsg(msg.resource, msg.id), { severity: 'error', ...options })
  }

}

