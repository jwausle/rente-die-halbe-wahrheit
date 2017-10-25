"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var github_service_1 = require("../shared/github.service");
var RepoDetailComponent = /** @class */ (function () {
    function RepoDetailComponent(github, route) {
        this.github = github;
        this.route = route;
        this.repoDetails = {};
    }
    RepoDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.org = _this.route.snapshot.parent.params['org'];
            _this.repo = params['repo'] || '';
            if (_this.repo) {
                _this.github.getRepoForOrg(_this.org, _this.repo)
                    .subscribe(function (repoDetails) {
                    _this.repoDetails = repoDetails;
                });
            }
        });
    };
    RepoDetailComponent = __decorate([
        core_1.Component({
            selector: 'repo-detail',
            styleUrls: ['./repo-detail.component.css'],
            templateUrl: './repo-detail.component.html'
        }),
        __metadata("design:paramtypes", [github_service_1.GithubService, router_1.ActivatedRoute])
    ], RepoDetailComponent);
    return RepoDetailComponent;
}());
exports.RepoDetailComponent = RepoDetailComponent;
//# sourceMappingURL=repo-detail.component.js.map