start:
	PORT=6006 yarn start

test:
	npm test

define _deploy
	-ssh $1 "mkdir /home/app/$2/facilities-assessment-host/app-servers/dashboard/"
	-ssh $1 "rm -rf /home/app/$2/facilities-assessment-host/app-servers/dashboard/*"
	scp -r build/* $1:/home/app/$2/facilities-assessment-host/app-servers/dashboard/
endef

build-deployable:
	npm run build

deploy-nhsrc-qa: build-deployable
	$(call _deploy,gunak-other,qa-server)

deploy-nhsrc-prod: build-deployable
	$(call _deploy,gunak-main)

deploy-to-local: build-deployable
	rm -rf ../facilities-assessment-server/dashboard/* && cp -r build/* ../facilities-assessment-server/dashboard/
