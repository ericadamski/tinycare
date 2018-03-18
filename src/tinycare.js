/* @flow */
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { filter } from "rxjs/operators";
import "rxjs/add/observable/interval";

const TwitterKeys = ["apiKey", "apiSecret", "consumerKey", "consumerSecret"];

type TwitterConfig = {
  apiKey: string,
  apiSecret: string,
  consumerKey: string,
  consumerSecret: string
};

let _subscriptions;
export let _canStartTimer$;

export function emitCanStartTimer(value: boolean): void {
  if (!_canStartTimer$)
    throw new Error("Please make sure you call tinycare(options) first.");

  _canStartTimer$.next(value);
}

export function timer(time: number): () => Observable<number> {
  return () => Observable.interval(time);
}

function startTimer(time: number): void {
  addSubscription(
    _canStartTimer$
      .pipe(filter(v => v))
      .take(1)
      .subscribe(timer(time))
  );
}

function addSubscription(sub: Subscription): void {
  !_subscriptions ? (_subscriptions = sub) : _subscriptions.remove(sub);
}

function unsubscribe(): void {
  _subscriptions && _subscriptions.unsubscribe();
}

export default function tinycare(options: {
  twitter: TwitterConfig,
  breakTime: number
}): void {
  let twitterKeys;

  if (
    !options.twitter ||
    !(
      (twitterKeys = Object.keys(options.twitter)).length ===
        TwitterKeys.length &&
      twitterKeys.every(key => TwitterKeys.includes(key))
    )
  )
    throw new Error("Missing or incorrect Twitter config.");

  !_canStartTimer$ && (_canStartTimer$ = new Subject());
}
