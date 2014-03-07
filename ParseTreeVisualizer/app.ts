//// <reference path="typescript.d.ts" />
/// <reference path="Scripts/typings/d3/d3.d.ts" />
class Logger implements TypeScript.ILogger {
    public log(msg) { console.log(msg); }
    public information() { return true; }
    public debug() { return true; }
    public warning() { return true; }
    public error() { return true; }
    public fatal() { return true; }
}


interface D3Tree {
    type: string;
    name: string;
    children: D3Tree[];
}

class D3TreeBuilder extends TypeScript.SyntaxWalker {
    public root: D3Tree;
    private currentChildren: D3Tree[];
    private childrenStack: D3Tree[][] = [];

    public pushChildren(): D3Tree[] {
        this.childrenStack.push(this.currentChildren);
        return this.currentChildren = [];
    }

    public addChild(type: string, name?: string): D3Tree {
        var currentChildren = this.currentChildren;
        var child = { type: type, name: name || type, children: this.pushChildren() };
        if (currentChildren) {
            currentChildren.push(child);
        }
        return child;
    }

    public popChildren() {
        this.currentChildren = this.childrenStack.pop();
    }

    public visitList(list: TypeScript.ISyntaxList): void {
        this.addChild('ISyntaxList');
        super.visitList(list);
        this.popChildren();
    }

    public visitSeparatedList(list: TypeScript.ISeparatedSyntaxList): void {
        this.addChild('ISeparatedSyntaxList');
        super.visitSeparatedList(list);
        this.popChildren();
    }

    public visitSourceUnit(node: TypeScript.SourceUnitSyntax): void {
        this.root = this.addChild('SourceUnitSyntax');
        super.visitSourceUnit(node);
        this.popChildren();
    }

    public visitClassDeclaration(node: TypeScript.ClassDeclarationSyntax): void {
        this.addChild('ClassDeclarationSyntax', "class " + node.identifier.text());
        super.visitClassDeclaration(node);
        this.popChildren();
    }

    public visitEnumDeclaration(node: TypeScript.EnumDeclarationSyntax): void {
        this.addChild('EnumDeclarationSyntax', 'enum ' + node.identifier.text());
        super.visitEnumDeclaration(node);
        this.popChildren();
    }

    public visitEnumElement(node: TypeScript.EnumElementSyntax): void {
        this.addChild('EnumElementSyntax', '(enum member)');
        super.visitEnumElement(node);
        this.popChildren();
    }

    public visitInterfaceDeclaration(node: TypeScript.InterfaceDeclarationSyntax): void {
        this.addChild('InterfaceDeclarationSyntax', "interface " + node.identifier.text());
        super.visitInterfaceDeclaration(node);
        this.popChildren();
    }

    public visitModuleDeclaration(node: TypeScript.ModuleDeclarationSyntax): void {
        this.addChild('ModuleDeclarationSyntax', "module " + node.moduleName.fullText());
        super.visitModuleDeclaration(node);
        this.popChildren();
    }

    public visitFunctionDeclaration(node: TypeScript.FunctionDeclarationSyntax): void {
        this.addChild('FunctionDeclarationSyntax', "function " + node.identifier.text());
        super.visitFunctionDeclaration(node);
        this.popChildren();
    }

    public visitMemberFunctionDeclaration(node: TypeScript.MemberFunctionDeclarationSyntax): void {
        this.addChild('MemberFunctionDeclarationSyntax', node.propertyName.text() + "() { ... }");
        super.visitMemberFunctionDeclaration(node);
        this.popChildren();
    }

    public visitParameterList(node: TypeScript.ParameterListSyntax): void {
        this.addChild('ParameterListSyntax', '(function parameters)');
        super.visitParameterList(node);
        this.popChildren();
    }

    public visitVariableStatement(node: TypeScript.VariableStatementSyntax): void {
        this.addChild('VariableStatementSyntax');
        super.visitVariableStatement(node);
        this.popChildren();
    }

    public visitVariableDeclaration(node: TypeScript.VariableDeclarationSyntax): void {
        this.addChild('VariableDeclarationSyntax');
        super.visitVariableDeclaration(node);
        this.popChildren();
    }

    public visitVariableDeclarator(node: TypeScript.VariableDeclaratorSyntax): void {
        this.addChild('VariableDeclaratorSyntax', 'var ' + node.identifier.text());
        super.visitVariableDeclarator(node);
        this.popChildren();
    }


    public visitTypeParameterList(node: TypeScript.TypeParameterListSyntax): void {
        this.addChild('TypeParameterListSyntax');
        super.visitTypeParameterList(node);
        this.popChildren();
    }

    public visitTypeParameter(node: TypeScript.TypeParameterSyntax): void {
        this.addChild('TypeParameterSyntax');
        super.visitTypeParameter(node);
        this.popChildren();
    }

    public visitIfStatement(node: TypeScript.IfStatementSyntax): void {
        this.addChild('IfStatementSyntax', 'if');
        super.visitIfStatement(node);
        this.popChildren();
    }

    public visitMemberAccessExpression(node: TypeScript.MemberAccessExpressionSyntax): void {
        this.addChild('MemberAccessExpressionSyntax', 'Dot');
        super.visitMemberAccessExpression(node);
        this.popChildren();
    }

    public visitTypeOfExpression(node: TypeScript.TypeOfExpressionSyntax): void {
        this.addChild('TypeOfExpressionSyntax', 'typeof');
        super.visitTypeOfExpression(node);
        this.popChildren();
    }

    public visitMemberVariableDeclaration(node: TypeScript.MemberVariableDeclarationSyntax): void {
        this.addChild('MemberVariableDeclarationSyntax');
        super.visitMemberVariableDeclaration(node);
        this.popChildren();
    }

    public visitBlock(node: TypeScript.BlockSyntax): void {
        this.addChild('BlockSyntax', '{ ... }');
        super.visitBlock(node);
        this.popChildren();
    }

    public visitBinaryExpression(node: TypeScript.BinaryExpressionSyntax): void {
        this.addChild('BinaryExpressionSyntax');
        super.visitBinaryExpression(node);
        this.popChildren();
    }

    public visitInvocationExpression(node: TypeScript.InvocationExpressionSyntax): void
    {
        this.addChild('InvocationExpressionSyntax', 'call()');
        super.visitInvocationExpression(node);
        this.popChildren();
    }

    public visitReturnStatement(node: TypeScript.ReturnStatementSyntax): void {
        this.addChild('ReturnStatementSyntax', 'return');
        super.visitReturnStatement(node);
        this.popChildren();
    }

    public visitSimpleArrowFunctionExpression(node: TypeScript.SimpleArrowFunctionExpressionSyntax): void
    {
        this.addChild('SimpleArrowFunctionExpressionSyntax', '=>');
        super.visitSimpleArrowFunctionExpression(node);
        this.popChildren();
    }

    public visitArrayLiteralExpression(node: TypeScript.ArrayLiteralExpressionSyntax): void {
        this.addChild('ArrayLiteralExpressionSyntax', '[]');
        super.visitArrayLiteralExpression(node);
        this.popChildren();
    }

    public visitGetAccessor(node: TypeScript.GetAccessorSyntax): void {
        this.addChild('GetAccessorSyntax', 'getter');
        super.visitGetAccessor(node);
        this.popChildren();
    }

    public visitSetAccessor(node: TypeScript.SetAccessorSyntax): void {
        this.addChild('SetAccessorSyntax', 'getter');
        super.visitSetAccessor(node);
        this.popChildren();
    }

    public visitForStatement(node: TypeScript.ForStatementSyntax): void {
        this.addChild('ForStatementSyntax', 'for');
        super.visitForStatement(node);
        this.popChildren();
    }

    public visitElseClause(node: TypeScript.ElseClauseSyntax): void {
        this.addChild('ElseClauseSyntax', 'else');
        super.visitElseClause(node);
        this.popChildren();
    }

    public visitParenthesizedExpression(node: TypeScript.ParenthesizedExpressionSyntax): void {
        this.addChild('ParenthesizedExpressionSyntax', '(...Expression...)');
        super.visitParenthesizedExpression(node);
        this.popChildren();
    }

    public visitObjectLiteralExpression(node: TypeScript.ObjectLiteralExpressionSyntax): void {
        this.addChild('ObjectLiteralExpressionSyntax', '{...Members...}');
        super.visitObjectLiteralExpression(node);
        this.popChildren();
    }

    public visitToken(token: TypeScript.ISyntaxToken): void {
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
                super.visitToken(token);
                this.popChildren();
                return;
            default: 
                super.visitToken(token);
                return;
        }
    }

    public visitThrowStatement(node: TypeScript.ThrowStatementSyntax): void {
        this.addChild('ThrowStatementSyntax', 'throw');
        super.visitThrowStatement(node);
        this.popChildren();
    }

    public visitTryStatement(node: TypeScript.TryStatementSyntax): void {
        this.addChild('TryStatementSyntax', 'try');
        super.visitTryStatement(node);
        this.popChildren();
    }

    public visitFinallyClause(node: TypeScript.FinallyClauseSyntax): void {
        this.addChild('FinallyClauseSyntax', 'finally');
        super.visitFinallyClause(node);
        this.popChildren();
    }

    public visitCatchClause(node: TypeScript.CatchClauseSyntax): void {
        this.addChild('CatchClauseSyntax', 'catch');
        super.visitCatchClause(node);
        this.popChildren();
    }


    public visitFunctionExpression(node: TypeScript.FunctionExpressionSyntax): void {
        this.addChild('FunctionExpressionSyntax', 'function(){...}');
        super.visitFunctionExpression(node);
        this.popChildren();
    }

    /*
    public visitEqualsValueClause(node: TypeScript.EqualsValueClauseSyntax): void;
    public visitPrefixUnaryExpression(node: TypeScript.PrefixUnaryExpressionSyntax): void;
    public visitOmittedExpression(node: TypeScript.OmittedExpressionSyntax): void;
    public visitParenthesizedArrowFunctionExpression(node: TypeScript.ParenthesizedArrowFunctionExpressionSyntax): void;
    public visitQualifiedName(node: TypeScript.QualifiedNameSyntax): void;
    public visitConstructorType(node: TypeScript.ConstructorTypeSyntax): void;
    public visitFunctionType(node: TypeScript.FunctionTypeSyntax): void;
    public visitObjectType(node: TypeScript.ObjectTypeSyntax): void;
    public visitArrayType(node: TypeScript.ArrayTypeSyntax): void;
    public visitGenericType(node: TypeScript.GenericTypeSyntax): void;
    public visitTypeQuery(node: TypeScript.TypeQuerySyntax): void;
    public visitTypeAnnotation(node: TypeScript.TypeAnnotationSyntax): void;
    public visitPostfixUnaryExpression(node: TypeScript.PostfixUnaryExpressionSyntax): void;
    public visitElementAccessExpression(node: TypeScript.ElementAccessExpressionSyntax): void;
    public visitArgumentList(node: TypeScript.ArgumentListSyntax): void;
    public visitConditionalExpression(node: TypeScript.ConditionalExpressionSyntax): void;
    public visitConstructSignature(node: TypeScript.ConstructSignatureSyntax): void;
    public visitMethodSignature(node: TypeScript.MethodSignatureSyntax): void;
    public visitIndexSignature(node: TypeScript.IndexSignatureSyntax): void;
    public visitPropertySignature(node: TypeScript.PropertySignatureSyntax): void;
    public visitCallSignature(node: TypeScript.CallSignatureSyntax): void;
    public visitConstraint(node: TypeScript.ConstraintSyntax): void;
    public visitExpressionStatement(node: TypeScript.ExpressionStatementSyntax): void;
    public visitConstructorDeclaration(node: TypeScript.ConstructorDeclarationSyntax): void;
    public visitIndexMemberDeclaration(node: TypeScript.IndexMemberDeclarationSyntax): void;
    public visitObjectCreationExpression(node: TypeScript.ObjectCreationExpressionSyntax): void;
    public visitSwitchStatement(node: TypeScript.SwitchStatementSyntax): void;
    public visitCaseSwitchClause(node: TypeScript.CaseSwitchClauseSyntax): void;
    public visitDefaultSwitchClause(node: TypeScript.DefaultSwitchClauseSyntax): void;
    public visitBreakStatement(node: TypeScript.BreakStatementSyntax): void;
    public visitContinueStatement(node: TypeScript.ContinueStatementSyntax): void;
    public visitForInStatement(node: TypeScript.ForInStatementSyntax): void;
    public visitWhileStatement(node: TypeScript.WhileStatementSyntax): void;
    public visitWithStatement(node: TypeScript.WithStatementSyntax): void;
    public visitCastExpression(node: TypeScript.CastExpressionSyntax): void;
    public visitSimplePropertyAssignment(node: TypeScript.SimplePropertyAssignmentSyntax): void;
    public visitFunctionPropertyAssignment(node: TypeScript.FunctionPropertyAssignmentSyntax): void;
    public visitEmptyStatement(node: TypeScript.EmptyStatementSyntax): void;
    public visitLabeledStatement(node: TypeScript.LabeledStatementSyntax): void;
    public visitDoStatement(node: TypeScript.DoStatementSyntax): void;
    public visitDeleteExpression(node: TypeScript.DeleteExpressionSyntax): void;
    public visitVoidExpression(node: TypeScript.VoidExpressionSyntax): void;
    public visitDebuggerStatement(node: TypeScript.DebuggerStatementSyntax): void; */
}

var m = { left: 20, top: 120, right: 20, bottom: 120 },
    w = 1600 - m.top - m.bottom,
    h = 1280 - m.left - m.right,
    i = 0,
    root,
    tree,
    diagonal,
    vis;

function update(source) {
    console.log('Updating tree');
    var duration = d3.event && d3.event.altKey ? 5000 : 500;

    // Compute the new tree layout.
    var nodes = <any>tree.nodes(root);//.reverse();
    console.log('nodes:', nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function (d) { d.y = d.depth * 90; });

    // Update the nodes…
    var node = vis.selectAll("g.node")
        .data(nodes, function (d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function (d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
        .on("click", function (d) { toggle(d); update(d); });

    nodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("svg:text")
        .attr("y", function (d) { return d.children || d._children ? -10 : 10; })
        .attr("xy", ".35em")
        .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
        .text(function (d) { return d.name; })
        .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function (d) { return "translate(" + source.x + "," + source.y + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function (d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", function (d) {
            var o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
        })
        .transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition links to their new position.
    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function (d) {
            var o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
        })
        .remove();

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

    var text: TypeScript.ISimpleText = TypeScript.SimpleText.fromString(source);

    var parser = TypeScript.Parser.parse('#source', text, false, new TypeScript.ParseOptions(TypeScript.LanguageVersion.EcmaScript5, true));

    var d3builder = new D3TreeBuilder();

    parser.sourceUnit().accept(d3builder);
    console.log(d3builder.root);
    root = d3builder.root;
    update(d3builder.root);
}
declare var $: any;
declare var _: any;
$(function () {
    tree = d3.layout.tree().size([h, w]);

    diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.x, d.y]; });

    vis = d3.select("#tree").append("svg:svg")
        .attr("width", w + m.left + m.right)
        .attr("height", h + m.top + m.bottom)
        .append("svg:g")
        .attr("transform", "translate(" + m.left+ "," + m.top + ")")
    var parser = _.throttle(source => parse(source), 1000, { leading: false });
    $('#source').bind('keyup', function () {
        parser($(this).val());
    });
});