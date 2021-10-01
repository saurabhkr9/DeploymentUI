import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';


const toastSubject = new Subject();
const defaultId = 'default-toast';
const toastTimeout=5000

export const ToasterApi = {
    onToast,
    success,
    error,
    info,
    warn,
    alert,
    clear,
    toastTimeout
};

export const toastType = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning',
    warning_alt:'warning-alt'
}

function onToast(id = defaultId) {
    return toastSubject.asObservable().pipe(filter(x => x && x.id === id));
}

function success(message, options) {
    toast({ ...options, type: toastType.success, message });
}

function error(message, options) {
    toast({ ...options, type: toastType.error, message });
}

function info(message, options) {
    toast({ ...options, type: toastType.info, message });
}

function warn(message, options) {
    toast({ ...options, type: toastType.warning, message });
}

function alert(message, options) {
    toast({ ...options, type: toastType.warning_alt, message });
}

function toast(toast) {
    toast.id = toast.id || defaultId;
    toastSubject.next(toast);
}


function clear(id = defaultId) {
    toastSubject.next({ id });
}

