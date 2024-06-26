This is a simple Google ad component for Google Publisher Tag(GPT https://developers.google.com/publisher-tag/guides/get-started) No magic, that can easily manage responsive Google ads for react(next.js) related system.

You can customize your Ad-slot-related configuration using a web UI.

<img src="doc/config-slot.png" alt="drawing" width="500"/>

After configuration, you only need to import the Ad components accordingly. like this.

```js
<Ad id="lead" position="lead" adUnit="/xxxxxx/Homepage"/>
```

#### How to use

Step 1:
Create device view port

<img src="doc/config-device.png" alt="drawing" width="500"/>

Step 2：
Config slots

<img src="doc/config-slot.png" alt="drawing" width="500"/>

Step 3：
Copy [Ad components](app%2Fcomponents%2FAd) to your project.

Step 4：
Copy the config data to replace [slotsConfig.js](app%2Fcomponents%2FAd%2FslotsConfig.js) in your project.

<img src="doc/copy-data.png" alt="drawing" width="500"/>

Step 5：
Import the Ad components accordingly. like this.

```js
<Ad id="lead" position="lead" adUnit='/xxxxxx/Homepage'/>
```

#### Run service
```shell
npm run dev
```

#### Set Page level Ad target

1. Use meta tag:
```html
<meta name="ad-targeting" content="google-ad-targeting"
      data-channel="nochannel" data-subchannel="nosubchannel"
      data-meta="na" data-eventid="na" data-country="na" data-state="na"
/>
```

2. Use hook setTargeting:

```js
  const { setTargeting } = useInit()

useEffect(() => {
  setTargeting('Mark', 'wang')
}, [])

```