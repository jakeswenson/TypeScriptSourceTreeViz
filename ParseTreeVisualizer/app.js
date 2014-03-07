var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//// <reference path="typescript.d.ts" />
/// <reference path="Scripts/typings/d3/d3.d.ts" />
var Logger = (function () {
    function Logger() {
    }
    Logger.prototype.log = function (msg) {
        console.log(msg);
    };
    Logger.prototype.information = function () {
        return true;
    };
    Logger.prototype.debug = function () {
        return true;
    };
    Logger.prototype.warning = function () {
        return true;
    };
    Logger.prototype.error = function () {
        return true;
    };
    Logger.prototype.fatal = function () {
        return true;
    };
    return Logger;
})();

var D3TreeBuilder = (function (_super) {
    __extends(D3TreeBuilder, _super);
    function D3TreeBuilder() {
        _super.apply(this, arguments);
        this.childrenStack = [];
    }
    D3TreeBuilder.prototype.pushChildren = function () {
        this.childrenStack.push(this.currentChildren);
        return this.currentChildren = [];
    };

    D3TreeBuilder.prototype.addChild = function (type, name) {
        var currentChildren = this.currentChildren;
        var child = { type: type, name: name || type, children: this.pushChildren() };
        if (currentChildren) {
            currentChildren.push(child);
        }
        return child;
    };

    D3TreeBuilder.prototype.popChildren = function () {
        this.currentChildren = this.childrenStack.pop();
    };

    D3TreeBuilder.prototype.visitList = function (list) {
        this.addChild('ISyntaxList');
        _super.prototype.visitList.call(this, list);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitSeparatedList = function (list) {
        this.addChild('ISeparatedSyntaxList');
        _super.prototype.visitSeparatedList.call(this, list);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitSourceUnit = function (node) {
        this.root = this.addChild('SourceUnitSyntax');
        _super.prototype.visitSourceUnit.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitClassDeclaration = function (node) {
        this.addChild('ClassDeclarationSyntax', "class " + node.identifier.text());
        _super.prototype.visitClassDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitEnumDeclaration = function (node) {
        this.addChild('EnumDeclarationSyntax', 'enum ' + node.identifier.text());
        _super.prototype.visitEnumDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitEnumElement = function (node) {
        this.addChild('EnumElementSyntax', '(enum member)');
        _super.prototype.visitEnumElement.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitInterfaceDeclaration = function (node) {
        this.addChild('InterfaceDeclarationSyntax', "interface " + node.identifier.text());
        _super.prototype.visitInterfaceDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitModuleDeclaration = function (node) {
        this.addChild('ModuleDeclarationSyntax', "module " + node.moduleName.fullText());
        _super.prototype.visitModuleDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitFunctionDeclaration = function (node) {
        this.addChild('FunctionDeclarationSyntax', "function " + node.identifier.text());
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitMemberFunctionDeclaration = function (node) {
        this.addChild('MemberFunctionDeclarationSyntax', node.propertyName.text() + "() { ... }");
        _super.prototype.visitMemberFunctionDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitParameterList = function (node) {
        this.addChild('ParameterListSyntax', '(function parameters)');
        _super.prototype.visitParameterList.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitVariableStatement = function (node) {
        this.addChild('VariableStatementSyntax');
        _super.prototype.visitVariableStatement.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitVariableDeclaration = function (node) {
        this.addChild('VariableDeclarationSyntax');
        _super.prototype.visitVariableDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitVariableDeclarator = function (node) {
        this.addChild('VariableDeclaratorSyntax', 'var ' + node.identifier.text());
        _super.prototype.visitVariableDeclarator.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitTypeParameterList = function (node) {
        this.addChild('TypeParameterListSyntax');
        _super.prototype.visitTypeParameterList.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitTypeParameter = function (node) {
        this.addChild('TypeParameterSyntax');
        _super.prototype.visitTypeParameter.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitIfStatement = function (node) {
        this.addChild('IfStatementSyntax', 'if');
        _super.prototype.visitIfStatement.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitMemberAccessExpression = function (node) {
        this.addChild('MemberAccessExpressionSyntax', 'Dot');
        _super.prototype.visitMemberAccessExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitTypeOfExpression = function (node) {
        this.addChild('TypeOfExpressionSyntax', 'typeof');
        _super.prototype.visitTypeOfExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitMemberVariableDeclaration = function (node) {
        this.addChild('MemberVariableDeclarationSyntax');
        _super.prototype.visitMemberVariableDeclaration.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitBlock = function (node) {
        this.addChild('BlockSyntax', '{ ... }');
        _super.prototype.visitBlock.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitBinaryExpression = function (node) {
        this.addChild('BinaryExpressionSyntax');
        _super.prototype.visitBinaryExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitInvocationExpression = function (node) {
        this.addChild('InvocationExpressionSyntax', 'call()');
        _super.prototype.visitInvocationExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitReturnStatement = function (node) {
        this.addChild('ReturnStatementSyntax', 'return');
        _super.prototype.visitReturnStatement.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitSimpleArrowFunctionExpression = function (node) {
        this.addChild('SimpleArrowFunctionExpressionSyntax', '=>');
        _super.prototype.visitSimpleArrowFunctionExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitArrayLiteralExpression = function (node) {
        this.addChild('ArrayLiteralExpressionSyntax', '[]');
        _super.prototype.visitArrayLiteralExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitGetAccessor = function (node) {
        this.addChild('GetAccessorSyntax', 'getter');
        _super.prototype.visitGetAccessor.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitSetAccessor = function (node) {
        this.addChild('SetAccessorSyntax', 'getter');
        _super.prototype.visitSetAccessor.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitForStatement = function (node) {
        this.addChild('ForStatementSyntax', 'for');
        _super.prototype.visitForStatement.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitElseClause = function (node) {
        this.addChild('ElseClauseSyntax', 'else');
        _super.prototype.visitElseClause.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitParenthesizedExpression = function (node) {
        this.addChild('ParenthesizedExpressionSyntax', '(...Expression...)');
        _super.prototype.visitParenthesizedExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitObjectLiteralExpression = function (node) {
        this.addChild('ObjectLiteralExpressionSyntax', '{...Members...}');
        _super.prototype.visitObjectLiteralExpression.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitToken = function (token) {
        switch (token.tokenKind) {
            case TypeScript.SyntaxKind.NumericLiteral:
            case TypeScript.SyntaxKind.StringLiteral:
            case TypeScript.SyntaxKind.PlusPlusToken:
            case TypeScript.SyntaxKind.PlusToken:
            case TypeScript.SyntaxKind.IdentifierName:
            case TypeScript.SyntaxKind.MinusToken:
            case TypeScript.SyntaxKind.MinusMinusToken:
            case TypeScript.SyntaxKind.TildeToken:
            case TypeScript.SyntaxKind.SlashToken:
            case TypeScript.SyntaxKind.SlashEqualsToken:
            case TypeScript.SyntaxKind.PlusEqualsToken:
            case TypeScript.SyntaxKind.MinusEqualsToken:
            case TypeScript.SyntaxKind.TildeToken:
            case TypeScript.SyntaxKind.LessThanToken:
            case TypeScript.SyntaxKind.LessThanLessThanEqualsToken:
            case TypeScript.SyntaxKind.LessThanLessThanToken:
            case TypeScript.SyntaxKind.LessThanEqualsToken:
            case TypeScript.SyntaxKind.GreaterThanToken:
            case TypeScript.SyntaxKind.GreaterThanEqualsToken:
            case TypeScript.SyntaxKind.GreaterThanGreaterThanEqualsToken:
            case TypeScript.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case TypeScript.SyntaxKind.ExclamationToken:
            case TypeScript.SyntaxKind.AsteriskToken:
            case TypeScript.SyntaxKind.AsteriskEqualsToken:
            case TypeScript.SyntaxKind.EqualsToken:
            case TypeScript.SyntaxKind.EqualsEqualsToken:
            case TypeScript.SyntaxKind.QuestionToken:
            case TypeScript.SyntaxKind.PublicKeyword:
            case TypeScript.SyntaxKind.PrivateKeyword:
            case TypeScript.SyntaxKind.ExportKeyword:
            case TypeScript.SyntaxKind.TrueKeyword:
            case TypeScript.SyntaxKind.FalseKeyword:
            case TypeScript.SyntaxKind.DebuggerKeyword:
            case TypeScript.SyntaxKind.DeclareKeyword:
                this.addChild(TypeScript.SyntaxKind[token.tokenKind], token.text());
                _super.prototype.visitToken.call(this, token);
                this.popChildren();
                return;
            default:
                _super.prototype.visitToken.call(this, token);
                return;
        }
    };

    D3TreeBuilder.prototype.visitThrowStatement = function (node) {
        this.addChild('ThrowStatementSyntax', 'throw');
        _super.prototype.visitThrowStatement.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitTryStatement = function (node) {
        this.addChild('TryStatementSyntax', 'try');
        _super.prototype.visitTryStatement.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitFinallyClause = function (node) {
        this.addChild('FinallyClauseSyntax', 'finally');
        _super.prototype.visitFinallyClause.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitCatchClause = function (node) {
        this.addChild('CatchClauseSyntax', 'catch');
        _super.prototype.visitCatchClause.call(this, node);
        this.popChildren();
    };

    D3TreeBuilder.prototype.visitFunctionExpression = function (node) {
        this.addChild('FunctionExpressionSyntax', 'function(){...}');
        _super.prototype.visitFunctionExpression.call(this, node);
        this.popChildren();
    };
    return D3TreeBuilder;
})(TypeScript.SyntaxWalker);

var m = { left: 20, top: 120, right: 20, bottom: 120 }, w = 1600 - m.top - m.bottom, h = 1280 - m.left - m.right, i = 0, root, tree, diagonal, vis;

function update(source) {
    console.log('Updating tree');
    var duration = d3.event && d3.event.altKey ? 5000 : 500;

    // Compute the new tree layout.
    var nodes = tree.nodes(root);
    console.log('nodes:', nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) {
        d.y = d.depth * 90;
    });

    // Update the nodes…
    var node = vis.selectAll("g.node").data(nodes, function (d) {
        return d.id || (d.id = ++i);
    });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("svg:g").attr("class", "node").attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
    }).on("click", function (d) {
        toggle(d);
        update(d);
    });

    nodeEnter.append("svg:circle").attr("r", 1e-6).style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeEnter.append("svg:text").attr("y", function (d) {
        return d.children || d._children ? -10 : 10;
    }).attr("xy", ".35em").attr("text-anchor", function (d) {
        return d.children || d._children ? "end" : "start";
    }).text(function (d) {
        return d.name;
    }).style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition().duration(duration).attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    nodeUpdate.select("circle").attr("r", 4.5).style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
    });

    nodeUpdate.select("text").style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition().duration(duration).attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
    }).remove();

    nodeExit.select("circle").attr("r", 1e-6);

    nodeExit.select("text").style("fill-opacity", 1e-6);

    // Update the links…
    var link = vis.selectAll("path.link").data(tree.links(nodes), function (d) {
        return d.target.id;
    });

    // Enter any new links at the parent's previous position.
    link.enter().insert("svg:path", "g").attr("class", "link").attr("d", function (d) {
        var o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
    }).transition().duration(duration).attr("d", diagonal);

    // Transition links to their new position.
    link.transition().duration(duration).attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition().duration(duration).attr("d", function (d) {
        var o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
    }).remove();

    // Stash the old positions for transition.
    nodes.forEach(function (d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children.
function toggle(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
}

function parse(source) {
    console.log('parsing source:', source);

    var settings = new TypeScript.CompilationSettings();

    //var compiler = new TypeScript.TypeScriptCompiler(new Logger(), TypeScript.ImmutableCompilationSettings.fromCompilationSettings(settings));
    var text = TypeScript.SimpleText.fromString(source);

    var parser = TypeScript.Parser.parse('#source', text, false, new TypeScript.ParseOptions(TypeScript.LanguageVersion.EcmaScript5, true));

    var d3builder = new D3TreeBuilder();

    parser.sourceUnit().accept(d3builder);
    console.log(d3builder.root);
    root = d3builder.root;
    update(d3builder.root);
}

$(function () {
    tree = d3.layout.tree().size([h, w]);

    diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.x, d.y];
    });

    vis = d3.select("#tree").append("svg:svg").attr("width", w + m.left + m.right).attr("height", h + m.top + m.bottom).append("svg:g").attr("transform", "translate(" + m.left + "," + m.top + ")");
    var parser = _.throttle(function (source) {
        return parse(source);
    }, 1000, { leading: false });
    $('#source').bind('keyup', function () {
        parser($(this).val());
    });
});
//# sourceMappingURL=app.js.map
