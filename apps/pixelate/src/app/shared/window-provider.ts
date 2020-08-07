import {
  InjectionToken,
  ClassProvider,
  FactoryProvider,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export declare type WindowContext = Window | object;

export const WINDOW = new InjectionToken('WindowToken');

export abstract class WindowRef {
  get nativeWindow(): WindowContext {
    throw new Error('Not Implemented');
  }
}

export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  get nativeWindow(): WindowContext {
    return window;
  }
}

export function windowFactory(
  browserWindowRef: BrowserWindowRef,
  platformId: object
): WindowContext {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }
  return new Object();
}

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef,
};

const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID],
};

export const WINDOW_PROVIDERS = [browserWindowProvider, windowProvider];
