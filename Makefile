start:
	PORT=6006 yarn start

test:
	npm test

deploy-nhsrc-qa:
	npm run build
	ssh gunak-other "mkdir /home/app/qa-server/facilities-assessment-host/app-servers/dashboard/"
	ssh gunak-other "rm -rf /home/app/qa-server/facilities-assessment-host/app-servers/dashboard/*"
	scp -r build/* gunak-other:/home/app/qa-server/facilities-assessment-host/app-servers/dashboard/

deploy-to-local:
	npm run build
	rm -rf ../facilities-assessment-server/dashboard/* && cp -r build/* ../facilities-assessment-server/dashboard/