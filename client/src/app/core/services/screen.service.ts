import { Output, Injectable, EventEmitter, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ScreenService {
  @Output() changed = new EventEmitter();

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .subscribe(() => this.changed.next(true));
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {

        if (window) {
          this.document.getElementsByTagName('body')[0].scroll({ top: 0, behavior: 'smooth' })
        }
      });
  }

  private isLargeScreen() {
    const isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);
    const isXLarge = this.breakpointObserver.isMatched(Breakpoints.XLarge);

    return isLarge || isXLarge;
  }

  public get sizes(): Record<string, boolean> {
    return {
      'screen-x-small': this.breakpointObserver.isMatched(Breakpoints.XSmall),
      'screen-small': this.breakpointObserver.isMatched(Breakpoints.Small),
      'screen-medium': this.breakpointObserver.isMatched(Breakpoints.Medium),
      'screen-large': this.isLargeScreen(),
    };
  }
}
