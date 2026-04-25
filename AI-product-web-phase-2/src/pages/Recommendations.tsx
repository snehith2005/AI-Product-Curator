import { useState, useEffect } from 'react';
import { productsApi, type ProductResponse, type SmartComparisonResponse } from '../api/products.api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Star,
  Sparkles,
  Users,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  XCircle,
  Package,
  TrendingDown,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Recommendations() {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [recommendations, setRecommendations] = useState<ProductResponse[]>([]);
  const [forYouLabel, setForYouLabel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPriceComparison, setShowPriceComparison] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
  const [comparisonData, setComparisonData] = useState<SmartComparisonResponse | null>(null);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);

  const categories = ['All', 'Laptops', 'Audio', 'Smartphones', 'Electronics', 'Home', 'Fashion'];

  useEffect(() => {
    loadRecommendations();
  }, [selectedCategory]);

  const loadRecommendations = async () => {
    setIsLoading(true);
    setForYouLabel(null);
    try {
      if (selectedCategory === 'All' && isAuthenticated) {
        // Fetch ALL saved products (own + other users) from DB
        const data = await productsApi.getForYouRecommendations(30, true);
        setRecommendations(data.recommendations);
        if (data.source === 'other_users') {
          setForYouLabel(data.label);
        }
      } else {
        const data = await productsApi.getRecommendations(selectedCategory, 20);
        setRecommendations(data);
      }
    } catch (error) {
      console.error('Failed to load recommendations:', error);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComparePrice = async (product: ProductResponse) => {
    setSelectedProduct(product);
    setShowPriceComparison(true);
    setIsLoadingComparison(true);
    setComparisonData(null);

    try {
      const data = await productsApi.smartCompare(product.name);
      setComparisonData(data);
    } catch (error) {
      console.error('Comparison failed:', error);
    } finally {
      setIsLoadingComparison(false);
    }
  };

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Recommendations
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">AI Picks for You</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Personalized product recommendations powered by AI, tailored to your preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 space-y-8">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1.5",
                selectedCategory === category
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Recommendations Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            <span className="ml-3 text-muted-foreground">Loading recommendations...</span>
          </div>
        ) : recommendations.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                </h2>
                {forYouLabel && (
                  <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    {forYouLabel}
                  </p>
                )}
              </div>
              <Badge variant="secondary" className="rounded-full px-4">{recommendations.length} picks</Badge>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((product, index) => (
                <ProductCard
                  key={product.id || index}
                  product={product}
                  onComparePrice={() => handleComparePrice(product)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No recommendations available for this category.</p>
            <p className="text-sm mt-2">Try selecting a different category above.</p>
          </div>
        )}

        <PriceComparisonDialog
          open={showPriceComparison}
          onOpenChange={setShowPriceComparison}
          product={selectedProduct}
          comparisonData={comparisonData}
          isLoading={isLoadingComparison}
        />
      </div>
    </div>
  );
}

function ProductCard({ product, onComparePrice }: {
  product: ProductResponse;
  onComparePrice: () => void;
}) {
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discountPercent || 0;

  const isInStock = product.availability?.toLowerCase().includes('in stock') ||
                    product.availability?.toLowerCase().includes('available') ||
                    product.availability === 'Unknown';

  return (
    <div className="group relative rounded-3xl bg-white dark:bg-gray-900/80 border border-gray-100 dark:border-white/10 overflow-hidden hover-lift ring-2 ring-violet-500/20">
      {/* Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <Package className={cn("h-16 w-16 text-gray-300 dark:text-gray-600", product.image && "hidden")} />

        {/* Badges */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 border-0 gap-1 shadow-lg">
            <Sparkles className="h-3 w-3" />
            AI Pick
          </Badge>
        </div>

        {discount > 0 && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 border-0 shadow-lg">
              -{discount}%
            </Badge>
          </div>
        )}

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 shadow-lg">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold line-clamp-2 leading-snug mb-2">{product.name}</h3>

        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-1 mb-4">{product.description}</p>
        )}

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold">
            {product.price ? `₹${product.price.toLocaleString()}` : 'Price N/A'}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm mb-5">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            {product.rating ? (
              <>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
                {product.reviews && <span>({product.reviews.toLocaleString()})</span>}
              </>
            ) : (
              <span className="text-xs">No ratings</span>
            )}
          </div>
          <Badge
            variant="outline"
            className={cn(
              "rounded-full",
              isInStock ? "text-emerald-600 border-emerald-200 bg-emerald-50" : "text-gray-500"
            )}
          >
            {isInStock ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
            {isInStock ? 'In Stock' : product.availability || 'Unknown'}
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground mb-4">
          via <span className="font-medium text-foreground">{product.platform}</span>
          {product.brand && <span> | {product.brand}</span>}
        </div>

        {product.reason && (
          <p className="text-xs text-violet-600 dark:text-violet-400 mb-4 italic">
            "{product.reason}"
          </p>
        )}

        <div className="flex gap-2">
          <Button className="flex-1 h-11 rounded-2xl gap-2" onClick={onComparePrice}>
            Compare Prices
            <ArrowRight className="h-4 w-4" />
          </Button>
          {product.url ? (
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl" asChild>
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl opacity-50 cursor-not-allowed" disabled>
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function PriceComparisonDialog({
  open,
  onOpenChange,
  product,
  comparisonData,
  isLoading
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductResponse | null;
  comparisonData: SmartComparisonResponse | null;
  isLoading: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Price Comparison</DialogTitle>
          <DialogDescription>
            {product ? `Comparing prices for: ${product.name}` : 'Find the best deal across all platforms'}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500 mb-4" />
            <p className="text-muted-foreground">Fetching prices from multiple platforms...</p>
          </div>
        ) : comparisonData && comparisonData.comparisons.length > 0 ? (
          <>
            <div className="rounded-2xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Platform</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Value Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisonData.comparisons.map((platform, index) => (
                    <TableRow
                      key={index}
                      className={platform.isBestDeal ? "bg-emerald-50/50 dark:bg-emerald-950/20" : ""}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {platform.platform}
                          {platform.isBestDeal && (
                            <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 border-0 text-xs">
                              Best
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">₹{platform.price.toLocaleString()}</span>
                          {platform.originalPrice && platform.originalPrice > platform.price && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{platform.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {platform.rating ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {platform.rating.toFixed(1)}
                            {platform.reviewCount && (
                              <span className="text-xs text-muted-foreground">
                                ({platform.reviewCount.toLocaleString()})
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
                              style={{ width: `${platform.valueScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{platform.valueScore.toFixed(0)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full">
                          {platform.availability || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {platform.productUrl && (
                          <Button size="sm" variant="ghost" className="gap-1 rounded-full" asChild>
                            <a href={platform.productUrl} target="_blank" rel="noopener noreferrer">
                              Visit <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {comparisonData.bestDeal && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-1">Best Deal Found!</h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {comparisonData.recommendation || `${comparisonData.bestDeal.platform} offers the best value at ₹${comparisonData.bestDeal.price.toLocaleString()}.`}
                    </p>
                    {comparisonData.priceRange && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                        Price range: ₹{comparisonData.priceRange.min.toLocaleString()} - ₹{comparisonData.priceRange.max.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">
              No comparison data available for this product.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching for a different product.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
