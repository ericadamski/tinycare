/* @flow */
import Twit from "twit";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { filter, takeUntil, take } from "rxjs/operators";
import "rxjs/add/observable/interval";

const TwitterKeys = [
  "accessKey",
  "accessSecret",
  "consumerKey",
  "consumerSecret"
];

type TwitterConfig = {
  accessToken: string,
  accessSecret: string,
  consumerKey: string,
  consumerSecret: string
};

let _subscriptions;
let _canStartTimer$;
let _breakTaken$;
let _tweet$;
let _t;

function initFirst(source$, fn) {
  return function() {
    if (!source$)
      throw new Error("Please make sure you call tinycare(options) first.");

    return fn(...arguments);
  };
}

export const emitCanStartTimer = initFirst(_canStartTimer$, v =>
  _canStartTimer$.next(v)
);

export const emitBreakTaken = initFirst(_breakTaken$, v =>
  _breakTaken$.next(v)
);

function getTweet(): void {
  const opts = {
    exclude_replies: true,
    include_rts: false,
    count: 1,
    screen_name: "tinycarebot"
  };

  _t.get(
    "statuses/user_timeline",
    opts,
    (err, [{ text, user }]) =>
      err
        ? _tweet$.error(
            new Error(
              "This didn't work. Maybe you didn't set up the twitter API keys?"
            )
          )
        : _tweet$.next({ text, bot: user.screen_name })
  );
}

function fetchFromTwitter(source$: Observable<number>): Observable<number> {
  addSubscription(source$.subscribe(getTweet));

  return source$;
}

function timer(time: number): () => Observable<number> {
  const break$ = _breakTaken$.pipe(filter(v => v));

  return () => (
    addSubscription(break$.subscribe(startTimer(time))),
    fetchFromTwitter(Observable.interval(time).pipe(takeUntil(break$)))
  );
}

function startTimer(time: number): void {
  unsubscribe();
  !_canStartTimer$ && (_canStartTimer$ = new Subject());

  addSubscription(
    _canStartTimer$
      .pipe(filter(v => v))
      .pipe(take(1))
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
  breakTime: number,
  onCareNotification: func
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

  !_breakTaken$ && (_breakTaken$ = new Subject());
  !_tweet$ && (_tweet$ = new Subject());

  process.env.NODE_ENV !== "test" &&
    !_t &&
    (_t = new Twit({
      consumer_key: options.twitter.consumerKey,
      consumer_secret: options.twitter.consumerSecret,
      access_token: options.twitter.accessToken,
      access_token_secret: options.twitter.accessSecret
    }));

  startTimer(options.breakTime || 50 * (60 * 1000));

  _tweet$.subscribe(options.onCareNotification);
}
